'use strict';

/**
 * Module Dependencies
 */
var Junction = require('./junction');

/**
 * Extends the Criterion.
 */
Junction.extend(Disjunction);

/**
 * Group expressions together in a single disjunction (A or B or C...).
 * 
 * @param {Array#criterions} criterions
 * @returns {Disjunction}
 */
function Disjunction(criterions) {
    this.constructor.super_.call(this, Junction.Nature.OR, criterions);
}

/**
 * Module Exports
 */
module.exports = Disjunction;