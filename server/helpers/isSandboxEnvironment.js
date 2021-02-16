const env = require('../../config');
const isSandboxEnvironment = () => (env.NODE_ENV === 'sandbox');

module.exports = isSandboxEnvironment;
