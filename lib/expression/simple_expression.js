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
 * Return typed values for all parameters in the rendered fragment.
 * 
 * @param {Criteria} criteria
 * @param {Adapter} adapter
 * @returns {Object}
 */
SimpleExpression.prototype.getTypedValues = function(criteria, adapter) {
    return adapter.getValues(
            this.op,
            this.propertyName,
            this.value,
            criteria);
};

/**
 * @Override
 * 
 * Return the query of the adapter.
 * 
 * @param {Criteria} criteria
 * @param {Adapter} adapter
 * @returns {Object}
 */
SimpleExpression.prototype.getQuery = function(criteria, adapter) {
    return adapter.buildQuery(
            this.op,
            this.propertyName,
            this.value,
            criteria);
};

/**
 * Return the operation.
 * 
 * @param {Adapter} adapter
 * @returns {String}
 */
SimpleExpression.prototype.getOp = function(adapter) {
    return adapter.parseOp(this.op);
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