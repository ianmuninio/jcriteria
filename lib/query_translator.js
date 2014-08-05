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
 * Module Exports
 */
module.exports = QueryTranslator;