'use strict';

/**
 * Module Dependencies
 */
var Criterion = require('../criterion');

/**
 * Extends the Criterion.
 */
Criterion.extend(SimpleExpression);

/**
 * Superclass for "simple" comparisons.
 * 
 * @param {String} propertyName
 * @param {Object} value
 * @param {String} op
 * @param {Boolean} ignoreCase
 * @returns {SimpleExpression}
 */
function SimpleExpression(propertyName, value, op, ignoreCase) {
    this.propertyName = propertyName;
    this.value = value;
    this.op = op;
    this.ignoreCase = ignoreCase || false;
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
SimpleExpression.prototype.getQuery = function(criteria, queryTranslator) {
    return queryTranslator.getQuery(criteria, this);
};

/**
 * Ignores the casing of the property value.
 * 
 * @returns {SimpleExpression.prototype}
 */
SimpleExpression.prototype.setIgnoreCase = function() {
    this.ignoreCase = true;

    return this;
};

/**
 * Module Exports
 */
module.exports = SimpleExpression;