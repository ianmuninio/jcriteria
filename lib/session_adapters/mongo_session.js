'use strict';

/**
 * Module Dependencies
 */
var Session = require('../session.js');
var JModel = require('jmodel');
var JCriteriaError = require('../error');
var CriteriaImpl = require('../impl/criteria_impl');
var MongoJS = require('mongojs');
var _ = require('lodash');
var MongoTranslator = require('../translators/mongo_translator');

/**
 * Extends the Session.
 */
Session.extend(MongoSession);

/**
 * Session handler for MongoJS.
 * 
 * @param {String} connectionString
 * @returns {MongoSession}
 */
function MongoSession(connectionString) {
    this.database = MongoJS(connectionString);
    this.translator = new MongoTranslator();
}

/**
 * Creates a criteria for model.
 * 
 * @param {JModel} modelClass
 * @returns {Criteria}
 */
MongoSession.prototype.createCriteria = function(modelClass) {
    if (!modelClass.prototype instanceof JModel.Model) {
        throw new JCriteriaError('Argument 1 is not an instance of JModel');
    }

    var collectionName = modelClass['collectionName'];
    var idAttribute = modelClass['idAttribute'];

    return new CriteriaImpl(idAttribute, collectionName, modelClass, this);
};

/**
 * Creates new model for the specified data and save.
 * 
 * @param {JModel} modelClass
 * @param {Object} data
 * @param {Function} callback
 * @returns {MongoSession.prototype}
 */
MongoSession.prototype.create = function(modelClass, data, callback) {
    if (!modelClass.prototype instanceof JModel.Model) {
        throw new JCriteriaError('Argument 1 is not an instance of JModel');
    }

    try {
        var model = new modelClass(data);
        this.save(model, callback);
    } catch (err) {
        callback(err);
    }

    return this;
};

/**
 * Saves the new model.
 * 
 * @param {JModel} model
 * @param {Function} callback
 * @returns {MongoSession.prototype}
 */
MongoSession.prototype.save = function(model, callback) {
    if (!model instanceof JModel.Model) {
        throw new JCriteriaError('Argument 1 is not an instance of JModel');
    }

    var collectionName = model['collectionName'];

    try {
        var modelData = model.toJSON();
        this.database.collection(collectionName).
                save(modelData, saveCallback);
    } catch (err) {
        callback(new JCriteriaError('Saving data error.', err));
    }

    function saveCallback(err, collectionData) {
        if (err) {
            return callback(new JCriteriaError('Saving data error.', err));
        }

        try {
            model.set(collectionData);
            callback(false, model);
        } catch (err) {
            callback(new JCriteriaError('Saving data error.', err));
        }
    }

    return this;
};

/**
 * Updates the model.
 * 
 * @param {JModel} model
 * @param {Function} callback
 * @returns {MongoSession.prototype}
 */
MongoSession.prototype.update = function(model, callback) {
    if (!model instanceof JModel.Model) {
        throw new JCriteriaError('Argument 1 is not an instance of JModel');
    } else if (!model.get('id')) {
        throw new JCriteriaError('Cannot update model without an id');
    }

    var collectionName = model['collectionName'];
    var idAttribute = model['idAttribute'];

    try {
        var modelData = model.toObject();
        delete modelData[idAttribute];

        var criteria = { };
        var update = { $set : modelData };

        criteria[idAttribute] = model.get('id');

        this.database.collection(collectionName).
                update(criteria, update, updateCallback);
    } catch (err) {
        callback(new JCriteriaError('Saving data error.', err));
    }

    function updateCallback(err) {
        if (err) {
            return callback(new JCriteriaError('Updating data error.', err));
        }

        callback(false, model);
    }

    return this;
};

/**
 * Removes the model.
 * 
 * @param {JModel} model
 * @param {Function} callback
 * @returns {MongoSession.prototype}
 */
MongoSession.prototype.remove = function(model, callback) {
    if (!model instanceof JModel.Model) {
        throw new JCriteriaError('Argument 1 is not an instance of JModel');
    }

    var collectionName = model['collectionName'];
    var idAttribute = model['idAttribute'];

    var criteria = { };
    criteria[idAttribute] = model.get('id');

    this.database.collection(collectionName).
            remove(criteria, removeCallback);

    function removeCallback(err) {
        if (err) {
            return callback(new JCriteriaError('Removing data error.', err));
        }

        callback(false, model);
    }

    return this;
};

/**
 * Get the results.
 * 
 * @param {CriteriaImpl} criteria
 * @param {Function} callback
 * @returns {MongoSession.prototype}
 */
MongoSession.prototype.list = function(criteria, callback) {
    var query = { };
    var sort = { };

    criteria.criterionEntries.forEach(function(criterionEntry) {
        var criteriaEntry = criterionEntry.getQuery(criteria, this.translator);

        _.merge(query, criteriaEntry, function(left, right) {
            if (Array.isArray(left) && Array.isArray(right)) {
                return left.concat(right);
            }
        });
    }.bind(this));

    criteria.orderEntries.forEach(function(orderEntry) {
        var sortEntry = orderEntry.getQuery(criteria, this.translator);

        _.extend(sort, sortEntry);
    }.bind(this));

    var collectionName = criteria.entityOrClassName;
    var modelClass = criteria.modelClass;
    var firstResult = criteria.firstResult || 0;
    var maxResults = criteria.maxResults || 0;

    this.database.collection(collectionName).
            find(query).
            skip(firstResult).
            limit(maxResults).
            sort(sort, findCallback);

    function findCallback(err, collectionDatas) {
        if (err) {
            return callback(new JCriteriaError('Finding data error.', err));
        }

        var models = [];
        try {
            collectionDatas.forEach(function(collectionData) {
                models.push(new modelClass(collectionData));
            });

            callback(false, models);
        } catch (err) {
            callback(new JCriteriaError('Finding data error.', err));
        }

    }

    return this;
};

/**
 * Convenience method to return a single instance that matches the query,
 * or null if the query returns no results.
 * 
 * @param {CriteriaImpl} criteria
 * @param {Function} callback
 * @returns {MongoSession.prototype}
 */
MongoSession.prototype.uniqueResult = function(criteria, callback) {
    var query = { };

    criteria.criterionEntries.forEach(function(criterionEntry) {
        var criteriaEntry = criterionEntry.getQuery(criteria, this.translator);

        _.merge(query, criteriaEntry, function(left, right) {
            if (Array.isArray(left) && Array.isArray(right)) {
                return left.concat(right);
            }
        });
    }.bind(this));

    var collectionName = criteria.entityOrClassName;
    var modelClass = criteria.modelClass;

    this.database.collection(collectionName).
            findOne(query, findCallback);

    function findCallback(err, collectionData) {
        if (err) {
            return callback(new JCriteriaError('Finding data error.', err));
        }

        var model = null;
        if (collectionData) {
            try {
                model = new modelClass(collectionData);
            } catch (err) {
                return callback(new JCriteriaError('Saving data error.', err));
            }
        }

        callback(false, model);
    }

    return this;
};

/**
 * Ends the current session.
 * 
 * @param {Function} callback
 * @returns {MongoSession.prototype}
 */
MongoSession.prototype.end = function(callback) {
    // noop since mongodb is not using sessions
    return this;
};

/**
 * Module Exports
 */
module.exports = MongoSession;