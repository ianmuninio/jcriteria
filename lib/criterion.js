'use strict';

/**
 * Module Dependencies
 */
var util = require('util');

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
    util.inherits(constructor, Criterion);
};

/**
 * Return typed values for all parameters in the rendered fragment.
 * 
 * @param {Criteria} criteria
 * @param {Adapter} adapter
 * @returns {Object}
 */
Criterion.prototype.getTypedValues = function(criteria, adapter) {
};

/**
 * Return the query of the adapter.
 * 
 * @param {Criteria} criteria
 * @param {Adapter} adapter
 * @returns {Object}
 */
Criterion.prototype.getQuery = function(criteria, adapter) {
};

/**
 * Module Exports
 */
module.exports = Criterion;