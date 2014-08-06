'use strict';

/**
 * Module Dependencies
 */
var Criterion = require('../criterion');

/**
 * Extends the Criterion.
 */
Criterion.extend(LikeExpression);

/**
 * Superclass for "like" comparisons.
 * 
 * @param {String} propertyName
 * @param {Object} value
 * @returns {LikeExpression}
 */
function LikeExpression(propertyName, value) {
    this.propertyName = propertyName;
    this.value = value;
    this.op = 'LIKE';
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
LikeExpression.prototype.getQuery = function(criteria, queryTranslator) {
    return queryTranslator.getQuery(criteria, this);
};

/**
 * Module Exports
 */
module.exports = LikeExpression;