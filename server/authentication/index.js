const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { User } = require('../database').models;
const env = require('../../config');
const { v4: uuidv4 } = require('uuid');

const GITHUB_CLIENT_ID = env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = env.GITHUB_CLIENT_SECRET;
const HOST = env.HOST;
const PORT = `:${env.PORT}`;

const authentication = {
    initialize: ({ app, database }) => {
        passport.serializeUser(function(user, done) {
            return done(null, {uuid: user.uuid, username: user.username});
        });

        passport.deserializeUser(async function(user, done) {
            const userFound = await User.findOne({where: { uuid: user.uuid }});
            if (!userFound) {
                return done(new Error('Could not find username'), null);
            }
            return done(null, {uuid: user.uuid, username: user.username});
        });

        passport.use(new GitHubStrategy({
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: `${HOST}${PORT}/auth/github/callback`
        },
        async (accessToken, refreshToken, profile, done) => {
            if (!profile.username) {
                return done(new Error('Could not find username'), null);
            }
            const user = await User.findOrCreate({
                where: { username: profile.username },
                defaults: {
                    uuid: uuidv4(),
                    username: profile.username,
                    password: accessToken,
                    token: accessToken
                }
            });
            return done(null, user[0].dataValues);
        }));
        app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: false, store: new SequelizeStore({db: database.sequelize}) }));
        app.use(passport.initialize());
        app.use(passport.session());
    },
    _ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/login');
    },
    ensureAuthorizedUser: (req, res, next) => {
        const sessionId = req?.session?.passport?.user?.uuid;
        const paramId = req?.params?.userUuid;
        if (!sessionId || !paramId || sessionId !== paramId) {
            res.status(401).json({
                success: false,
                error: {
                    status: 401,
                    message: 'This resource is forbidden'
                }
            });
            return;
        }
        return next();
    }
};

module.exports = authentication;
