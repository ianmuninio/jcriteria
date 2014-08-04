'use strict';

/**
 * JCriteria Factory Module
 */

/**
 * @Interface
 * 
 * Criteria is a simplified API for retrieving entities by composing Criterion
 * objects. This is a very convenient approach for functionality like "search"
 * screens where there is a variable number of conditions to be placed upon the
 * result set.
 */
exports.Criteria = require('./criteria');

/**
 * @Interface
 * 
 * An object-oriented representation of a query criterion that may be used as a
 * restriction in a Criteria query. Built-in criterion types are provided by
 * the Restrictions factory class. This interface might be implemented by
 * application classes that define custom restriction criteria.
 */
exports.Criterion = require('./criterion');

/**
 * @Interface
 * 
 * An adapter class of databases. Built-in database adapters are provided by
 * the Adapter factory class. This interface might be implemented by
 * application classes that define custom adapter.
 */
exports.Adapter = require('./adapter');

/**
 * The criterion package may be used by applications as a framework for
 * building new kinds of Criterion. However, it is intended that most 
 * applications will simply use the built-in criterion types via the static
 * factory methods of this class.
 */
exports.Restriction = require('./restriction');

/**
 * DB Adapter Factor Class.
 */
exports.DBAdapter = require('./adapter/');

/**
 * Creates and returns the created adapter.
 */
/**
 * 
 * @param {type} adapterName
 * @returns {Adapter}
 */
exports.createDBAdapter = function(adapterName) {
    var args = Array.prototype.slice.apply(arguments);
    args.shift();

    var Adapter = exports.DBAdapter[adapterName];
    var adapter = new Adapter.apply(null, args);

    return adapter;
};

/**
 * Criterion Expession Factor Class.
 */
exports.Expression = require('./expression/');

/**
 * Implementation of the Criteria interface.
 */
exports.CriteriaImpl = require('./impl/criteria_impl');