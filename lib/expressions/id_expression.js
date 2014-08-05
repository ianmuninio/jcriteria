'use strict';

/**
 * Module Dependencies
 */
var Criterion = require('../criterion');

/**
 * Extends the Criterion.
 */
Criterion.extend(IdExpression);

/**
 * Superclass for id comparisons.
 * 
 * @param {Object} value
 * @returns {IdExpression}
 */
function IdExpression(value) {
    this.value = value;
    this.op = 'eq';
}

/**
 * @Override
 * 
 * Return the query of the criterion.
 * 
 * @param {CriteriaImpl} criteria
 * @param {QueryTranslator} queryTranslator
 * @returns {Scalar}
 */
IdExpression.prototype.getQuery = function(criteria, queryTranslator) {
    this.propertyName = criteria.idAttribute;
    
    return queryTranslator.getQuery(criteria, this);
};

/**
 * Module Exports
 */
module.exports = IdExpression;