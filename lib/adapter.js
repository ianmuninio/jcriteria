'use strict';

/**
 * Module Dependencies
 */
var util = require('util');

/**
 * @Interface
 * 
 * An adapter class of databases. Built-in database adapters are provided by
 * the Adapter factory class. This interface might be implemented by
 * application classes that define custom adapter.
 * 
 * @returns {Adapter}
 */
function Adapter() {
}

/**
 * Inherits the prototype methods of constructor#Adapter into another
 * constructor.
 * 
 * @param {Class} constructor
 */
Adapter.extend = function(constructor) {
    util.inherits(constructor, Adapter);
};

/**
 * Get the results of the criterions.
 * 
 * @param {Array#Criterion} criterionEntries
 * @param {Number} firstResult
 * @param {Number} maxResults
 * @param {Function} callback
 * @returns {Adapter.prototype}
 */
Adapter.prototype.getResults = function(
        criterionEntries, firstResult, maxResults, callback) {
    return this;
};

/**
 * Get the single result of the criterions.
 * 
 * @param {Array#Criterion} criterionEntries
 * @param {Number} firstResult
 * @param {Number} maxResults
 * @param {Function} callback
 * @returns {Adapter.prototype}
 */
Adapter.prototype.getResult = function(
        criterionEntries, firstResult, maxResults, callback) {
    return this;
};

/**
 * Module Exports
 */
module.exports = Adapter;