'use strict';

/**
 * Module Dependencies
 */
var Adapter = require('../adapter');
var mongojs = require('mongojs');

/**
 * Extends the Adapter.
 */
Adapter.extend(MongoJS);

/**
 * Static Local Variables
 */
var OP = {
    eq : '$eq',
    ge : '$gte',
    gt : '$gt',
    le : '$lte',
    lt : '$lt',
    ne : '$ne'
};

/**
 * MongoJS Database Adapter Class
 * 
 * @param {String} connectionString
 * @returns {MongoJS}
 */
function MongoJS(connectionString) {
    this.database = mongojs.apply(this, arguments);
}

/**
 * Return the specified op equivalent.
 * 
 * @param {String} op
 * @returns {Object}
 */
MongoJS.prototype.parseOp = function(op) {
    return OP[op];
};

/**
 * Return the values of the criteria.
 * 
 * @param {String} op
 * @param {String} propertyName
 * @param {Object} value
 * @param {Criteria} criteria
 * @returns {Object}
 */
MongoJS.prototype.getValues = function(op, propertyName, value, criteria) {
    return value;
};

/**
 * Return the query.
 * 
 * @param {String} op
 * @param {String} propertyName
 * @param {Object} value
 * @param {Criteria} criteria
 * @returns {Object}
 */
MongoJS.prototype.buildQuery = function(op, propertyName, value, criteria) {
    var mongoOp = this.parseOp(op);

    var query = { };
    query[propertyName] = { };
    query[propertyName][mongoOp] = value;

    return query;
};

/**
 * Get the results of the criterions.
 * 
 * @param {CriteriaImpl} criteriaImpl
 * @param {Function} callback
 * @returns {MongoJS.prototype}
 */
MongoJS.prototype.getResults = function(criteriaImpl, callback) {
    var collection = this.getCollection(criteriaImpl.entityOrClassName);
    var criteria = { };
    var query;

    criteriaImpl.criterionEntries.forEach(function(criterion) {
        query = criterion.getQuery(criteria, this);

        for (var propertyName in query) {
            if (query.hasOwnProperty(propertyName)) {
                criteria[propertyName] = query[propertyName];
            }
        }
    }.bind(this));

    collection.find(criteria, callback);

    return this;
};

/**
 * Return the specified database's collection.
 * 
 * @param {type} collectionName
 * @returns {mongojs#Database#Collection}
 */
MongoJS.prototype.getCollection = function(collectionName) {
    return this.database.collection(collectionName);
};

/**
 * Get the single result of the criterions.
 * 
 * @param {CriteriaImpl} criteriaImpl
 * @param {Function} callback
 * @returns {MongoJS.prototype}
 */
MongoJS.prototype.getResult = function(criteriaImpl, callback) {
    var collection = this.getCollection(criteriaImpl.entityOrClassName);
    var criteria = { };
    var query;

    criteriaImpl.criterionEntries.forEach(function(criterion) {
        query = criterion.getQuery(criteria, this);

        for (var propertyName in query) {
            if (query.hasOwnProperty(propertyName)) {
                criteria[propertyName] = query[propertyName];
            }
        }
    }.bind(this));

    collection.findOne(criteria, callback);

    return this;
};

/**
 * Module Exports
 */
module.exports = MongoJS;