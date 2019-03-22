module.exports = (sequelize, Sequelize) => {
    const ThreadModel = sequelize.define('threads', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.TEXT
        },
        image: {
            type: Sequelize.TEXT
        },
        reference_id: {
            type: Sequelize.INTEGER
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        create_time: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true,
        timestamp: false
    });
    return ThreadModel;
};