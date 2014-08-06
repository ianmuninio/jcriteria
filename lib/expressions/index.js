'use strict';

/**
 * Criterion Expression Factory Class
 */

/**
 * Superclass for id comparisons.
 */
exports.IdExpression = require('./id_expression');

/**
 * Superclass for "simple" comparisons.
 */
exports.SimpleExpression = require('./simple_expression');

/**
 * Superclass for "like" comparisons.
 */
exports.LikeExpression = require('./like_expression');

/**
 * A sequence of a logical expressions combined by some associative
 * logical operator.
 */
exports.Junction = require('./junction');

/**
 * Group expressions together in a single conjunction (A and B and C...).
 */
exports.Conjunction = require('./conjunction');

/**
 * Group expressions together in a single disjunction (A or B or C...).
 */
exports.Disjunction = require('./disjunction');