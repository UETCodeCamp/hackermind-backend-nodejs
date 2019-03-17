module.exports = (sequelize, Sequelize) => {
    const UserModel = sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.TEXT
        },
        email: {
            type: Sequelize.STRING
        },
        avatar: {
            type: Sequelize.STRING
        },
        point: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.STRING
        },
        role_id: {
            type: Sequelize.INTEGER
        },
        create_time: {
            type: Sequelize.STRING
        }
    }, {
        timestamp: false,
        freezeTableName: true
    });
    return UserModel;
};