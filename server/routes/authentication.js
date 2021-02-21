const router = require('express').Router({mergeParams: true});
const passport = require('passport');

// route middleware to github authentication then redirect to /auth/github/callback
router.get('/github',
    passport.authenticate('github', { scope: ['user:email'] }),
    () => {
        // The request redirects to GitHub for authentication, so this function will not be called.
    }
);

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (_req, res) => {
        res.redirect('/');
    }
);

module.exports = router;
