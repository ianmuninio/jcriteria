'use strict';

/**
 * Module Dependencies
 */
var Util = require('util');

/**
 * @Interface
 * 
 * Abstract Session Class.
 * 
 * @returns {Session}
 */
function Session() {
}

/**
 * Inherits the prototype methods of constructor#Session into another
 * constructor.
 * 
 * @param {Class} constructor
 */
Session.extend = function(constructor) {
    Util.inherits(constructor, Session);
};

/**
 * Creates a criteria for model.
 * 
 * @param {JModel} model
 * @returns {Criteria}
 */
Session.prototype.createCriteria = function(model) {
};

/**
 * Creates new model for the specified data and save.
 * 
 * @param {JModel} model
 * @param {Object} data
 * @param {Function} callback
 * @returns {Session.prototype}
 */
Session.prototype.create = function(model, data, callback) {
    return this;
};

/**
 * Saves the new model.
 * 
 * @param {JModel} model
 * @param {Function} callback
 * @returns {Session.prototype}
 */
Session.prototype.save = function(model, callback) {
    return this;
};

/**
 * Updates the model.
 * 
 * @param {JModel} model
 * @param {Function} callback
 * @returns {Session.prototype}
 */
Session.prototype.update = function(model, callback) {
    return this;
};

/**
 * Removes the model.
 * 
 * @param {JModel} model
 * @param {Function} callback
 * @returns {Session.prototype}
 */
Session.prototype.remove = function(model, callback) {
    return this;
};

/**
 * Get the results.
 * 
 * @param {CriteriaImpl} criteria
 * @param {Function} callback
 * @returns {Session.prototype}
 */
Session.prototype.list = function(criteria, callback) {
    return this;
};

/**
 * Convenience method to return a single instance that matches the query,
 * or null if the query returns no results.
 * 
 * @param {CriteriaImpl} criteria
 * @param {Function} callback
 * @returns {Session.prototype}
 */
Session.prototype.uniqueResult = function(criteria, callback) {
    return this;
};

/**
 * Ends the current session.
 * 
 * @param {Function} callback
 * @returns {Session.prototype}
 */
Session.prototype.end = function(callback) {
    return this;
};

/**
 * Module Exports
 */
module.exports = Session;