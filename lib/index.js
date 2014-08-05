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
 * Abstract Session Class.
 */
exports.Session = require('./session');

/**
 * Session Adapters Factory Class.
 */
exports.SessionAdapters = require('./session_adapters');

/**
 * Criterion Query Translator Class.
 */
exports.QueryTranslator = require('./query_translator');

/**
 * Query Translators Factory Class.
 */
exports.Translators = require('./translators');

/**
 * The criterion package may be used by applications as a framework for
 * building new kinds of Criterion. However, it is intended that most 
 * applications will simply use the built-in criterion types via the static
 * factory methods of this class.
 */
exports.Restrictions = require('./restrictions');

/**
 * Criterion Expession Factory Class.
 */
exports.Expressions = require('./expressions');

/**
 * Implementation of the Criteria interface.
 */
exports.CriteriaImpl = require('./impl/criteria_impl');