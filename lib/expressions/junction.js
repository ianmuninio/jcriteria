'use strict';

/**
 * Module Dependencies
 */
var Util = require('util');
var Criterion = require('../criterion');
var JCriteriaError = require('../error');
var _ = require('lodash');

/**
 * Extends the Criterion.
 */
Criterion.extend(Junction);

/**
 * A sequence of a logical expressions combined by some associative
 * logical operator.
 * 
 * @returns {Junction}
 */
/**
 * 
 * @param {String} nature
 * @param {Array#criterions} criterions
 * @returns {Junction}
 */
function Junction(nature, criterions) {
    if (!Junction.Nature.hasOwnProperty(nature)) {
        throw new JCriteriaError('Invalid junction nature');
    }

    this.op = this.nature = nature;
    this.conditions = criterions || [];
}

/**
 * Enum Properties
 */
Junction.Nature = {
    AND : 'AND',
    OR : 'OR'
};

/**
 * Inherits the prototype methods of constructor#Junction into another
 * constructor.
 * 
 * @param {Class} constructor
 */
Junction.extend = function(constructor) {
    Util.inherits(constructor, Junction);
};

/**
 * Adds a criterion to the junction (and/or)
 * 
 * @param {Criterion} criterion
 * @returns {Junction.prototype}
 */
Junction.prototype.add = function(criterion) {
    if (!criterion instanceof Criterion) {
        throw new JCriteriaError('Argument 1 is not an instance of Criterion');
    }

    this.conditions.push(criterion);

    return this;
};

/**
 * @Override
 * 
 * Return the query of the criterion.
 * 
 * @param {CriteriaImpl} criteria
 * @param {QueryTranslator} queryTranslator
 * @returns {Scalar}
 */
Junction.prototype.getQuery = function(criteria, queryTranslator) {
    return queryTranslator.getQuery(criteria, this);
};

/**
 * Module Exports
 */
module.exports = Junction;