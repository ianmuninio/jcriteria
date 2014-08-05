'use strict';

/**
 * Module Dependencies
 */
var Session = require('../session.js');
var JModel = require('jmodel');
var JCriteriaError = require('../error');
var CriteriaImpl = require('../impl/criteria_impl');
var MongoJS = require('mongojs');
var _ = require('underscore');
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

    var model = new modelClass(data);
    return this.save(model, callback);
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
    var modelData = model.toJSON();

    this.database.collection(collectionName).
            save(modelData, saveCallback);

    function saveCallback(err, collectionData) {
        if (err) {
            return callback(new JCriteriaError('Saving data error.', err));
        }

        model.set(collectionData);

        callback(false, model);
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

    var modelData = model.toJSON();
    delete modelData[idAttribute];

    var criteria = { };
    var update = { $set : modelData };

    criteria[idAttribute] = model.get('id');

    this.database.collection(collectionName).
            update(criteria, update, updateCallback);

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

    criteria.criterionEntries.forEach(function(criterionEntry) {
        var criteriaEntry = criterionEntry.getQuery(criteria, this.translator);
        _.extend(query, criteriaEntry);
    }.bind(this));

    var collectionName = criteria.entityOrClassName;
    var modelClass = criteria.modelClass;

    this.database.collection(collectionName).
            find(query, findCallback);

    function findCallback(err, collectionDatas) {
        if (err) {
            return callback(new JCriteriaError('Finding data error.', err));
        }

        var models = [];
        collectionDatas.forEach(function(collectionData) {
            models.push(new modelClass(collectionData));
        });

        callback(false, models);
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
        _.extend(query, criteriaEntry);
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
            model = new modelClass(collectionData);
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