'use strict';

/**
 * Represents an order imposed upon a Criteria result set.
 * 
 * @param {String} propertyName
 * @param {Boolean} ascending (Optional) Default: true
 * @returns {Order}
 */
function Order(propertyName, ascending) {
    this.propertyName = propertyName;
    this.ascending = ascending;
}

/**
 * Return the query of the criterion.
 * 
 * @param {CriteriaImpl} criteria
 * @param {QueryTranslator} queryTranslator
 * @returns {Scalar}
 */
Order.prototype.getQuery = function(criteria, queryTranslator) {
    return queryTranslator.getOrderQuery(criteria, this);
};

/**
 * Ascending order.
 * 
 * @param {String} propertyName
 * @returns {Order}
 */
Order.asc = function(propertyName) {
    return new Order(propertyName, true);
};

/**
 * Descending order.
 * 
 * @param {String} propertyName
 * @returns {Order}
 */
Order.desc = function(propertyName) {
    return new Order(propertyName, false);
};

/**
 * Module Exports
 */
module.exports = Order;