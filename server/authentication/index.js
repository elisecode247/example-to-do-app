const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');
const { User } = require('../database').models;
const env = require('../../config');
const { v4: uuidv4 } = require('uuid');

const GITHUB_CLIENT_ID = env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = env.GITHUB_CLIENT_SECRET;
const HOST = env.HOST;
const PORT = `:${env.PORT}`;

const authentication = {
    initialize: ({ app }) => {
        passport.serializeUser(function(user, done) {
            done(null, user.dataValues);
        });

        passport.deserializeUser(function(user, done) {
            done(null, user);
        });

        passport.use(new GitHubStrategy({
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: `${HOST}${PORT}/auth/github/callback`
        },
        async (_accessToken, _refreshToken, profile, done) => {
            const user = await User.findOne({where: { username: profile.username }}) || await User.create({
                uuid: uuidv4(),
                username: profile.username,
                password: 'placeholderPassword'
            });
            return done(null, user);
        }));

        app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: false }));
        app.use(passport.initialize());
        app.use(passport.session());
    },
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/login');
    }
};

module.exports = authentication;
