/**
 * Module Dependencies
 */
var SimpleExpression = require('../lib/expression/simple_expression');

/**
 * Sample Adapter
 */
var sampleAdapter = {
    getValues : function(op, propetyName, value) {
        return value;
    },
    buildQuery : function(op, propetyName, value) {
        return propetyName + ' ' + op + ' ' + value;
    },
    parseOp : function(op) {
        return op;
    }
};

/**
 * Tests
 */
describe('Expression', function() {
    describe('SimpleExpression', function() {
        var expression = new SimpleExpression('a', 'b', '===');

        describe('#getTypedValues()', function() {
            it('should return b', function() {
                expect(expression.getTypedValues({ }, sampleAdapter)).to.
                        equal('b');
            });
        });

        describe('#getQuery()', function() {
            it('should return a === b', function() {
                expect(expression.getQuery({ }, sampleAdapter)).to.
                        equal('a === b');
            });
        });

        describe('#getOp()', function() {
            it('should return ===', function() {
                expect(expression.getOp(sampleAdapter)).to.equal('===');
            });
        });

        describe('#setIgnoreCase()', function() {
            it('should return property ignoreCase to true', function() {
                expression.setIgnoreCase();

                expect(expression.ignoreCase).to.be.ok;
            });
        });
    });
});