'use strict';

/**
 * Module Dependencies
 */
var Util = require('util');

/**
 * @Interface
 * 
 * Criteria is a simplified API for retrieving entities by composing Criterion
 * objects. This is a very convenient approach for functionality like "search"
 * screens where there is a variable number of conditions to be placed upon the
 * result set.
 * 
 * @returns {Criteria}
 */
function Criteria() {
}

/**
 * Inherits the prototype methods of constructor#Criteria into another
 * constructor.
 * 
 * @param {Class} constructor
 */
Criteria.extend = function(constructor) {
    Util.inherits(constructor, Criteria);
};

/**
 * Add a restriction to constrain the results to be retrieved.
 * 
 * @param {Criterion} criterion
 * @returns {Criteria.prototype}
 */
Criteria.prototype.add = function(criterion) {
    return this;
};

/**
 * Set a first result for the underlying query.
 * 
 * @param {Number} firstResult
 * @returns {Criteria.prototype}
 */
Criteria.prototype.setFirstResult = function(firstResult) {
    return this;
};

/**
 * Set a limit upon the number of object to be retrieved.
 * 
 * @param {Number} maxResults
 * @returns {Criteria.prototype}
 */
Criteria.prototype.setMaxResult = function(maxResults) {
    return this;
};

/**
 * Get the results.
 * 
 * @param {Function} callback
 * @returns {Criteria.prototype}
 */
Criteria.prototype.list = function(callback) {
    return this;
};

/**
 * Convenience method to return a single instance that matches the query,
 * or null if the query returns no results.
 * 
 * @param {Function} callback
 * @returns {Criteria.prototype}
 */
Criteria.prototype.uniqueResult = function(callback) {
    return this;
};

/**
 * Module Exports
 */
module.exports = Criteria;