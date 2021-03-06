module.exports = (sequelize, Sequelize) => {
    const QuizModel = sequelize.define('quizzes', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING
        },
        create_time: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        chapter_id: {
            type: Sequelize.INTEGER
        }
    },{
        freezeTableName: true,
        timestamp: false
    });
    return QuizModel;
};
