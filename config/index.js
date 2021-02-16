const configPath = `${__dirname}/${process.env.NODE_ENV}.env`;
const config = require('dotenv').config({path: configPath });
const { each } = require('lodash');

let environmentVariables = {};

if (!config.error) {
    environmentVariables = config.parsed;
} else {
    console.error(`Environment error is: ${config.error}.`);
    each(process.env, (value, key) => environmentVariables[key] = value);
}

module.exports = environmentVariables;
