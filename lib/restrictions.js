'use strict';

/**
 * Module Dependencies
 */
var Expressions = require('./expressions/');

/**
 * The criterion package may be used by applications as a framework for
 * building new kinds of Criterion. However, it is intended that most 
 * applications will simply use the built-in criterion types via the static
 * factory methods of this class.
 */

/**
 * Group expressions together in a single conjunction (A and B and C...).
 * 
 * @returns {Expressions.Conjunction}
 */
exports.conjunction = function() {
    return new Expressions.Conjunction();
};

/**
 * Group expressions together in a single disjunction (A or B or C...).
 * 
 * @returns {Expressions.Disjunction}
 */
exports.disjunction = function() {
    return new Expressions.Disjunction();
};

/**
 * Apply an "equal" constraint to the id property.
 * 
 * @param {Object} value
 * @returns {IdExpression}
 */
exports.idEq = function(value) {
    return new Expressions.IdExpression(value);
};

/**
 * Apply a "like" constraint to the named property.
 * 
 * @param {String} propertyName
 * @param {String} value
 * @returns {LikeExpression}
 */
exports.like = function(propertyName, value) {
    return new Expressions.LikeExpression(propertyName, value);
};

/**
 * Apply an "equal" constraint to the named property.
 * 
 * @param {String} propertyName
 * @param {Object} value
 * @returns {SimpleExpression}
 */
exports.eq = function(propertyName, value) {
    return exports.createSimpleExpression(propertyName, value, 'eq');
};

/**
 * Apply a "greater than or equal" constraint to the named property.
 * 
 * @param {String} propertyName
 * @param {Object} value
 * @returns {SimpleExpression}
 */
exports.ge = function(propertyName, value) {
    return exports.createSimpleExpression(propertyName, value, 'ge');
};

/**
 * Apply a "greater than" constraint to the named property.
 * 
 * @param {String} propertyName
 * @param {Object} value
 * @returns {SimpleExpression}
 */
exports.gt = function(propertyName, value) {
    return exports.createSimpleExpression(propertyName, value, 'gt');
};

/**
 * Apply a "less than or equal" constraint to the named property.
 * 
 * @param {String} propertyName
 * @param {Object} value
 * @returns {SimpleExpression}
 */
exports.le = function(propertyName, value) {
    return exports.createSimpleExpression(propertyName, value, 'le');
};

/**
 * Apply a "less than" constraint to the named property.
 * 
 * @param {String} propertyName
 * @param {Object} value
 * @returns {SimpleExpression}
 */
exports.lt = function(propertyName, value) {
    return exports.createSimpleExpression(propertyName, value, 'lt');
};

/**
 * Apply a "not equal" constraint to the named property.
 * 
 * @param {String} propertyName
 * @param {Object} value
 * @returns {SimpleExpression}
 */
exports.ne = function(propertyName, value) {
    return exports.createSimpleExpression(propertyName, value, 'ne');
};

/**
 * SimpleExpression factory method.
 * 
 * @param {String} propertyName
 * @param {Object} value
 * @param {String} op
 * @returns {SimpleExpression}
 */
exports.createSimpleExpression = function(propertyName, value, op) {
    return new Expressions.SimpleExpression(propertyName, value, op);
};