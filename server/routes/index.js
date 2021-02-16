const users = require('./users.js');

const routing = {
    initialize: ({app, express}) => {

        app.use(express.json()); // for parsing application/json
        app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
        app.use('/api/v1/users/', users); // use the user.js file for all routes that start with '/api/users/'

        app.get('/', (_req, res) => {
            res.send('hello world');
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
