const { assert } = require('chai');
const asyncHandler = require('../asyncHandler.js');

describe('helpers/asyncHandler', function() {

    const resolveCallback = (_req, _res, next) => {
        next(true);
    };
    const errorCallback = () => {
        throw new Error('Error');
    };
    const received = asyncHandler(resolveCallback);
    it('should return an async function', function() {
        assert.isFunction(received, 'Great, we can wrap functions to make them async.');
    });
    it('should resolve callback', () => {
        received({}, {}, result => {
            assert.isOk(result);
        });
    });
    it('should catch error', () => {
        const received = asyncHandler(errorCallback);
        received({}, {}, result => {
            assert.equal(result, 'Error');
        });
    });
});
