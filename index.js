const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const users = require('./routes/users.js');
const lists = require('./routes/lists.js');
const listItems = require('./routes/listItems.js');
/** Logging */
const expressPino = require('express-pino-logger');
const logger = require('pino')({ level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });

app.use(expressLogger);
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/api/v1/users/', users); // use the user.js file for all routes that start with '/api/users/'
app.use('/api/v1/users/:userId/lists/', lists); // use the lists.js file for all lists endpoints
app.use('/api/v1/users/:userId/lists/:listId/listItems/', listItems); // use the listItems.js file for all lists endpoints

app.get('/', (_req, res) => {
    res.send('hello world');
});

// Handle 404 - Keep this as a last route
app.use(function(_req, res) {
    res.status(404);
    res.json({success: false, errorMessage: 'This resource does not exist'});
});

app.listen(port, () => {
    logger.info(`Example app listening at http://localhost:${port}`);
});
