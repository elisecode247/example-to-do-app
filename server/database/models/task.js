const Sequelize = require('sequelize');

module.exports = sequelize => {
    class Task extends Sequelize.Model {}
    Task.init({
        uuid: {
            type: Sequelize.UUIDV4,
            unique: true,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        content: Sequelize.STRING,
        isComplete: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    }, { sequelize });

    return Task;
};
