const Sequelize = require('sequelize');

module.exports = sequelize => {
    class User extends Sequelize.Model {}
    User.init({
        uuid: {
            type: Sequelize.UUIDV4,
            unique: true,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
    }, { sequelize });

    return User;
};
