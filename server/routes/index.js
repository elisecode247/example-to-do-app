const authentication = require('./authentication.js');
const users = require('./users.js');

const routing = {
    initialize: ({app, express}) => {

        app.use(express.json()); // for parsing application/json
        app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
        app.use('/auth', authentication);
        app.use('/api/v1/users/', users); // use the user.js file for all routes that start with '/api/users/'

        app.get('/', (req, res) => {
            if (!req.user) {
                res.send(`<h1>Example TODO list</h1><p>Hello! <a href="/auth/github">Login with GitHub</a> for your to do list</p>`);
                return;
            }
            res.send(
                `<h1>Example TODO list</h1><p>Hello ${req.user.username}!</p>
                <p><a href="/logout">Logout</a></p>`
            );
        });

        app.get('/login', function(req, res) {
            if (!req.user) {
                res.send(`<a href="/auth/github">Login with GitHub</a>`);
                return;
            }
            res.send(`You are already logged in.`);
        });

        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });

        // Handle 404 - Keep this as a last route
        app.use(function(_req, res) {
            res.status(404);
            res.json({
                success: false,
                error: {
                    status: 404,
                    message: 'This resource does not exist'
                }
            });
        });

        // error handler middleware
        app.use((error, _req, res, next) => {
            console.error(error);
            res.status(error.status || 500).json({
                success: false,
                error: {
                    status: error.status || 500,
                    message: error.message || 'Internal Server Error',
                },
            });
            next();
        });
    }

};

module.exports = routing;
