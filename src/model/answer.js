module.exports = (sequelize, Sequelize) => {
    const AnswerModel = sequelize.define('answers', {
        question_id: {
            type: Sequelize.INTEGER
        },
        content: {
            type: Sequelize.STRING
        },
        position: {
            type: Sequelize.INTEGER
        }
    },{
        freezeTableName: true,
        timestamp: false
    });
    AnswerModel.removeAttribute('id');
    return AnswerModel;
};
