'use strict';

/**
 * Module Dependencies
 */
var QueryTranslator = require('../query_translator');
var Junction = require('../expressions/junction');
var LikeExpression = require('../expressions/').LikeExpression;
var _ = require('lodash');

/**
 * Extends the Session.
 */
QueryTranslator.extend(MongoTranslator);

/**
 * Static Local Variables
 */
var OP = {
    eq : '$eq',
    ge : '$gte',
    gt : '$gt',
    le : '$lte',
    lt : '$lt',
    ne : '$ne',
    LIKE : '$eq',
    AND : '$and',
    OR : '$or'
};

/**
 * Translate the criterion query to mongodb criteria query.
 * 
 * @returns {MongoTranslator}
 */
function MongoTranslator() {
}

/**
 * Return the specified op equivalent.
 * 
 * @param {String} op
 * @returns {Object}
 */
MongoTranslator.prototype.parseOp = function(op) {
    return OP[op];
};

/**
 * Returns the query of the criterion.
 * 
 * @param {CriteriaImpl} criteria
 * @param {Criterion} criterion
 * @returns {Scalar}
 */
MongoTranslator.prototype.getQuery = function(criteria, criterion) {
    var propertyName = criterion.propertyName;
    var value = criterion.value;
    var op = criterion.op;
    var mongoOp = this.parseOp(op);

    var query = { };
    query[propertyName] = { };
    query[propertyName][mongoOp] = value;

    if (criterion instanceof LikeExpression) {
        value = value.replace(/\%/g, '.*').
                replace(/\_/g, '.');
        value = new RegExp(value, 'i');

        query[propertyName] = value;
    }

    return query;
};

/**
 * Returns the order query.
 * 
 * @param {CriteriaImpl} criteria
 * @param {Order} order
 * @returns {Scalar}
 */
MongoTranslator.prototype.getOrderQuery = function(criteria, order) {
    var query = { };
    query[order.propertyName] = order.ascending ? 1 : -1;

    return query;
};

/**
 * Returns the junction query.
 * 
 * @param {CriteriaImpl} criteria
 * @param {Junction} junction
 * @returns {Scalar}
 */
MongoTranslator.prototype.getJunctionQuery = function(criteria, junction) {
    var nature = junction.nature;
    var conditions = junction.conditions;

    if (conditions.length === 0) {
        return { };
    }

    var mongoOp = this.parseOp(nature);

    var expressions = [];
    conditions.forEach(function(criterion) {
        var criterionQuery = criterion.getQuery(criteria, this);
        expressions.push(criterionQuery);
    }.bind(this));

    var query = { };
    query[mongoOp] = expressions;

    return query;
};

/**
 * Module Exports
 */
module.exports = MongoTranslator;