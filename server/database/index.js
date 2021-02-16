const Sequelize = require('sequelize');
const config = require('../../config');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config.DB_PATH,
    logging: false
});

const db = {
    sequelize,
    Sequelize,
    models: {},
    initialize: ({ env, logger }) => {
        sequelize.sync({ force: env.DB_FORCE_SYNC }).then(() => {
            logger.info('Connection to the database successful!');
        }).catch(error => {
            logger.error('Error connecting to the database: ', error);
        });
    },
};

db.models.User = require('./models/user.js')(sequelize);
db.models.Task = require('./models/task.js')(sequelize);

module.exports = db;
