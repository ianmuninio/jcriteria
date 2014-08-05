'use strict';

/**
 * Module Dependencies
 */
var Util = require('util');

/**
 * @Interface
 * 
 * An object-oriented representation of a query criterion that may be used as a
 * restriction in a Criteria query. Built-in criterion types are provided by
 * the Restrictions factory class. This interface might be implemented by
 * application classes that define custom restriction criteria.
 * 
 * @returns {Criterion}
 */
function Criterion() {
}

/**
 * Inherits the prototype methods of constructor#Criterion into another
 * constructor.
 * 
 * @param {Class} constructor
 */
Criterion.extend = function(constructor) {
    Util.inherits(constructor, Criterion);
};

/**
 * Return the query of the criterion.
 * 
 * @param {CriteriaImpl} criteria
 * @param {QueryTranslator} queryTranslator
 * @returns {Scalar}
 */
Criterion.prototype.getQuery = function(criteria, queryTranslator) {
};

/**
 * Module Exports
 */
module.exports = Criterion;