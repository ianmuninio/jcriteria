'use strict';

/**
 * Module Dependencies
 */
var QueryTranslator = require('../query_translator');

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
    ne : '$ne'
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

    return query;
};

/**
 * Module Exports
 */
module.exports = MongoTranslator;