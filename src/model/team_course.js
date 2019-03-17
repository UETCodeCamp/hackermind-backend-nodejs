module.exports = (sequelize, Sequelize) => {
    const TeamCourseModel = sequelize.define('teams_courses', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        course_id: {
            type: Sequelize.INTEGER
        },
        team_id: {
            type: Sequelize.INTEGER
        }
    },{
        freezeTableName: true,
        timestamp: false
    });
    return TeamCourseModel;
};