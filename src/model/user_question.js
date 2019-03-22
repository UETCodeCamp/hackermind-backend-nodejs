module.exports = (sequelize, Sequelize) => {
    const UserQuestionModel = sequelize.define('users_questions', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        question_id: {
            type: Sequelize.INTEGER
        },
        choose_answer: {
            type: Sequelize.STRING
        },
        is_correct: {
            type: Sequelize.STRING
        }
    },{
        freezeTableName: true,
        timestamp: false
    });
    return UserQuestionModel;
};