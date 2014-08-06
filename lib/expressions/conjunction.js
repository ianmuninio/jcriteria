'use strict';

/**
 * Module Dependencies
 */
var Junction = require('./junction');

/**
 * Extends the Criterion.
 */
Junction.extend(Conjunction);

/**
 * Group expressions together in a single conjunction (A and B and C...).
 * 
 * @param {Array#criterions} criterions
 * @returns {Conjunction}
 */
function Conjunction(criterions) {
    this.constructor.super_.call(this, Junction.Nature.AND, criterions);
}

/**
 * Module Exports
 */
module.exports = Conjunction;