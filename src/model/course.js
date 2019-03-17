module.exports = (sequelize, Sequelize) => {
    const CourseModel = sequelize.define('courses', {
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
        image: {
            type: Sequelize.TEXT
        },
        avatar: {
            type: Sequelize.TEXT
        },
        description: {
            type: Sequelize.STRING
        }
    },{
        freezeTableName: true,
        timestamp: false
    });
    return CourseModel;
};