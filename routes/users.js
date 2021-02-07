const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { isCommonPassword } = require('../utilities/validator');

// get data for all users
router.get('/', function (_req, res) {
    res.json({ users: [{id : 1, name: 'John Doe'}, {id : 2, name: 'Jane Doe'}]});
});

// get data for a specific user
router.get('/:userId', function (_req, res) {
    res.json({id : 2, name: 'Jane Doe'});
});

// add new user
router.post('/',
    body('username').isEmail(),
    body('password').isLength({ min: 5 }).custom(isCommonPassword),
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        res.json({success: true, body: req.body});
    }
);

// update user
router.put('/:userId', function (_req, res) {
    res.json({success: true});
});

// delete user
router.delete('/:userId', function (_req, res) {
    res.json({success: true});
});

module.exports = router;
