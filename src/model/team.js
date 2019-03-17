module.exports = (sequelize, Sequelize) => {
    const TeamModel = sequelize.define('teams', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        create_time: {
            type: Sequelize.STRING
        },

    },{
        freezeTableName: true,
        timestamp: false
    });
    return TeamModel;
};