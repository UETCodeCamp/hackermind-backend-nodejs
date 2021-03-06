module.exports = (sequelize, Sequelize) => {
    const ChapterModel = sequelize.define('chapters', {
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
        course_id: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.STRING
        }
    },{
        freezeTableName: true,
        timestamp: false
    });
    return ChapterModel;
};
