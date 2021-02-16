const { isUncommonPassword } = require('../validators');
const assert = require('assert');

describe('helpers/validators', function() {
    describe('isUncommonPassword()', function() {
        it('should return error when password is a common password', function() {
            try {
                isUncommonPassword('abc123');
            } catch (err) {
                assert.strictEqual(err.message, 'Your password "abc123" is too common. Pick a more unique password.');
                assert.strictEqual(err.name, 'Error');
            }
        });
        it('should return true when password is not common password', function() {
            assert.strictEqual(isUncommonPassword('rand0mpAsS30rd'), true);
        });
    });
});
