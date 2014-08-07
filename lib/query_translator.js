'use strict';

/**
 * Module Dependencies
 */
var Util = require('util');

/**
 * @Interface
 * 
 * Criterion Query Translator Class.
 * 
 * @returns {QueryTranslator}
 */
function QueryTranslator() {
}

/**
 * Inherits the prototype methods of constructor#QueryTranslator into another
 * constructor.
 * 
 * @param {Class} constructor
 */
QueryTranslator.extend = function(constructor) {
    Util.inherits(constructor, QueryTranslator);
};

/**
 * Returns the query of the criterion.
 * 
 * @param {CriteriaImpl} criteria
 * @param {Criterion} criterion
 * @returns {Scalar}
 */
QueryTranslator.prototype.getQuery = function(criteria, criterion) {
};

/**
 * Returns the order query.
 * 
 * @param {CriteriaImpl} criteria
 * @param {Order} order
 * @returns {Scalar}
 */
QueryTranslator.prototype.getOrderQuery = function(criteria, order) {
};

/**
 * Returns the junction query.
 * 
 * @param {CriteriaImpl} criteria
 * @param {Junction} junction
 * @returns {Scalar}
 */
QueryTranslator.prototype.getJunctionQuery = function(criteria, junction) {
};

/**
 * Module Exports
 */
module.exports = QueryTranslator;