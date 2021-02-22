const router = require('express').Router({mergeParams: true});
const { body, validationResult } = require('express-validator');
const asyncHandler = require('../helpers/asyncHandler');
const { isUncommonPassword } = require('../helpers/validators');
const { User, Task } = require('../database').models;
const authorizeUser = require('../authentication').ensureAuthorizedUser;

// Tasks need userUuid
router.use('/:userUuid/tasks', require('./tasks.js'));

// get data for a specific user
router.get('/:userUuid', authorizeUser, asyncHandler(async (req, res) => {
    const user = await User.findOne({where: { uuid: req.params.userUuid }});
    if (!user) {
        res.status(404).json({success: false, error: { status: 404, message: 'user not found' }});
        return;
    }
    res.json({success: true, data: {user: {uuid: user.uuid, name: user.username}}});
}));

// add new user
router.post('/',
    authorizeUser,
    body('username').isEmail(),
    body('password').isLength({ min: 5 }).custom(isUncommonPassword),
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                error: {
                    status: 400,
                    message: errors.array().reduce((arr, err) => `${arr}${arr ? '; ' : ''}${err.msg}`, '')
                }
            });
            return;
        }

        const newUser = await User.create({
            uuid: req.body.uuid,
            username: req.body.username,
            password: req.body.password
        });

        res.json({success: true, data: { user: { uuid: newUser.uuid } } });
        return;
    })
);

// update user
router.put('/:userUuid',
    authorizeUser,
    body('password').isLength({ min: 5 }).custom(isUncommonPassword),
    asyncHandler(async (req, res) => {
        if (req.body.username && !req.body.password) {
            res.status(403).json({success: false, error: { status: 403, message: 'cannot change password' }});
            return;
        }
        if (!req.body.password) {
            res.json({success: false, error: { status: 400, message: 'no password submitted' }});
            return;
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                error: {
                    status: 400,
                    message: errors.array().reduce((arr, err) => `${arr}${arr ? '; ' : ''}${err.msg}`, '')
                }
            });
            return;
        }

        const user = await User.findOne({where: { uuid: req.params.userUuid }});
        if (!user) {
            res.json({success: false, error: { status: 400, message: 'user not found' }});
            return;
        }

        user.update({
            password: req.body.password
        });
        res.json({success: true, data: { user: { uuid: user.uuid } }});
        return;
    })
);

// delete user and user's tasks and redirect to homepage
router.delete('/:userUuid', authorizeUser, asyncHandler(async (req, res) => {
    const user = await User.findOne({where: { uuid: req.params.userUuid }});
    if (!user) {
        res.json({success: false, error: { status: 400, message: 'user not found' }});
        return;
    }
    await User.destroy({where: { uuid: req.params.userUuid }});
    await Task.destroy({where: { userId: user.id }});
    res.redirect('/');
}));

module.exports = router;
