module.exports = (sequelize, Sequelize) => {
    const QuizModel = sequelize.define('quizzes', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        question: {
            type: Sequelize.STRING
        },
        url: {
            type: Sequelize.STRING
        },
        create_time: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        answer_one: {
            type: Sequelize.STRING
        },
        answer_two: {
            type: Sequelize.STRING
        },
        answer_three: {
            type: Sequelize.STRING
        },
        answer_four: {
            type: Sequelize.STRING
        },
        answer_correct: {
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