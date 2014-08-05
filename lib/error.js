'use strict';

/**
 * Module Dependencies
 */
var Util = require('util');

/**
 * JCriteria Error Class
 * 
 * @param {String} msg
 * @param {Error} error
 * @returns {JCriteriaError}
 */
function JCriteriaError(msg, error) {
    this.message = msg;
    this.error = error;

    Error.call(this);
    Error.captureStackTrace(this, this.constructor);
}

/**
 * Inheritance
 */
Util.inherits(JCriteriaError, Error);

/**
 * Default Prototype
 */
JCriteriaError.prototype.name = 'JCriteriaError';

/**
 * Module Exports
 */
module.exports = JCriteriaError;