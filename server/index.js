const env = require('../config');
const express = require('express');
const app = express();
const host = env.HOST;
const port = env.PORT;
const database = require('./database');
const authentication = require('./authentication');
const routing = require('./routes');
const expressPino = require('express-pino-logger');
const logger = require('pino')({ level: env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });

database.initialize({ env, logger });
authentication.initialize({ app, database });
routing.initialize({app, express, expressLogger});

const server = app.listen(port, () => {
    logger.info(`Example app listening at ${host}:${port}`);
});

process.on('SIGINT', () => {
    database.close();
    server.close();
});

module.exports = server;
