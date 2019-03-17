module.exports = (sequelize, Sequelize) => {
    const TeamUserModel = sequelize.define('teams_users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        team_id: {
            type: Sequelize.INTEGER
        }
    },{
        freezeTableName: true,
        timestamp: false

    });
    return TeamUserModel;
};