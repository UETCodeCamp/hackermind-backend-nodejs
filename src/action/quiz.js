const db = require('../database');

module.exports.createQuiz = async (payload) => {
    const quiz = await db.QuizModel.create(payload);
    return quiz;
}

module.exports.putQuiz = async (contrain, payload) => {
    const quiz = await db.QuizModel.update(payload, {
        where: contrain
    });
    return quiz;
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


module.exports.deleteQuiz = async (contrain) => {
    const quiz = await db.QuizModel.destroy({
        where: contrain
    });
    return quiz;
};