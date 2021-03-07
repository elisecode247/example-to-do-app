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
                `
                <h1>Example TODO list</h1>
                <p>Hello ${req.user.username}!</p>
                <p>Hello ${req.user.uuid}!</p>
                <p><a href="/logout">Logout</a></p>
                <p>
                    <form action="/api/v1/users/${req.user.uuid}/tasks/" method="post">
                        <input name="content" value="buy groceries" />
                        <input name"uuid" value="2342342342234324" />
                        <button name="uuid" type="submit" value="234233-423422-34324">Submit</button>
                    </form>
                </p>
                `
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

        // Handle 404 - Keep this as a last route for unhandled bad client requests
        app.use(function(_req, res) {
            res.status(404);
            res.send(`<h1>This page does not exist.</h1>`);
        });

        // error handler middleware
        app.use((error, req, res, next) => {
            // Client errors
            // Handle Redirect to 403 - Unauthorized user

            if (error.status === 403) {
                res.status(403);
                res.send(`<h1>You're not allowed here!</h1>`);
                return;
            }
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
