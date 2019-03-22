const db = require('../database');

module.exports.createQuestion = async (payload) => {
    const question = await db.QuestionModel.create(payload);
    return question;
};

module.exports.updateQuestion = async (contrain, payload) => {
    const question = await db.QuestionModel.update(payload, {
        where: contrain
    });
    return question;
};

module.exports.getQuizzes = async (contrain) => {
    const quizzes = await db.QuizModel.findAll({
        where: contrain,
        order: [
            ['create_time', 'DESC']
        ],
        attributes: ['id','question', 'description', 'url', 'answer_one', 'answer_two', 'answer_three', 'answer_four', 'chapter_id']
    }) ;
    return quizzes;
};


module.exports.deleteQuestion = async (contrain) => {
    const answer = await db.AnswerModel.destroy({
        where: {
            question_id: contrain.id
        }
    });
    const question = await db.QuestionModel.destroy({
        where: contrain
    });
    return question;
};