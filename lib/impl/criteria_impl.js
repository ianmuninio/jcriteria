'use strict';

/**
 * Module Dependencies
 */
var Criteria = require('../criteria');
var Criterion = require('../criterion');
var JCriteriaError = require('../error');

/**
 * Extends the Criteria.
 */
Criteria.extend(CriteriaImpl);

/**
 * Implementation of the Criteria interface.
 * 
 * @param {String} idAttribute
 * @param {String} entityOrClassName
 * @param {JModel} modelClass
 * @param {Session} session
 * @returns {CriteriaImpl}
 */
function CriteriaImpl(idAttribute, entityOrClassName, modelClass, session) {
    this.session = session;
    this.modelClass = modelClass;
    this.idAttribute = idAttribute;
    this.entityOrClassName = entityOrClassName;

    this.criterionEntries = [];
    this.maxResults = null;
    this.firstResult = null;
}

/**
 * Add a restriction to constrain the results to be retrieved.
 * 
 * @param {Criterion} criterion
 * @returns {CriteriaImpl.prototype}
 */
CriteriaImpl.prototype.add = function(criterion) {
    if (!criterion instanceof Criterion) {
        throw new JCriteriaError('Argument 1 is not an instance of Criterion');
    }

    this.criterionEntries.push(criterion);

    return this;
};

/**
 * Set a first result for the underlying query.
 * 
 * @param {Number} firstResult
 * @returns {CriteriaImpl.prototype}
 */
CriteriaImpl.prototype.setFirstResult = function(firstResult) {
    this.firstResult = firstResult;

    return this;
};

/**
 * Set a limit upon the number of object to be retrieved.
 * 
 * @param {Number} maxResults
 * @returns {CriteriaImpl.prototype}
 */
CriteriaImpl.prototype.setMaxResult = function(maxResults) {
    this.maxResults = maxResults;

    return this;
};

/**
 * Get the results.
 * 
 * @param {Function} callback
 * @returns {CriteriaImpl.prototype}
 */
CriteriaImpl.prototype.list = function(callback) {
    this.session.list(this, callback);

    return this;
};

/**
 * Convenience method to return a single instance that matches the query,
 * or null if the query returns no results.
 * 
 * @param {Function} callback
 * @returns {CriteriaImpl.prototype}
 */
CriteriaImpl.prototype.uniqueResult = function(callback) {
    this.session.uniqueResult(this, callback);

    return this;
};

/**
 * Module Exports
 */
module.exports = CriteriaImpl;