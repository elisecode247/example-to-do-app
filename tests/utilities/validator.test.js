const { isCommonPassword } = require('../../utilities/validator.js');
const assert = require('assert');

describe('utilities/validator', function() {
    describe('isCommonPassword()', function() {
        it('should return error when password is a common password', function() {
            try {
                isCommonPassword('abc123');
            } catch (err) {
                assert.strictEqual(err.message, 'Your password "abc123" is too common. Pick a more unique password.');
                assert.strictEqual(err.name, 'Error');
            }
        });
        it('should return true when password is not common password', function() {
            assert.strictEqual( isCommonPassword('rand0mpAsS30rd'), true);
        });
    });
});
