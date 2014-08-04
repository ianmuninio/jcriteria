/**
 * Module Dependencies
 */
var Restriction = require('../lib/restriction');
var SimpleExpression = require('../lib/expression/simple_expression');

/**
 * Tests
 */
describe('Restriction', function() {
    describe('#createSimpleExpression()', function() {
        it('should return object of SimpleExpression', function() {
            var expression = Restriction.createSimpleExpression();

            expect(expression).to.be.instanceof(SimpleExpression);
        });
    });
});