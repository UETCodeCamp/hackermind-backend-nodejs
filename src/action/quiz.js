const db = require('../database');

module.exports.createQuiz = async (payload) => {
    const quiz = await db.QuizModel.create(payload);
    return quiz;
};

module.exports.updateQuiz = async (contrain, payload) => {
    const quiz = await db.QuizModel.update(paylaod, {
        where: contrain
    });
    return quiz;
};

module.exports.getQuiz = async (contrain) => {
    const quiz = await db.QuizModel.findOne({
        where: contrain,
        include: [
            {
                model: db.QuestionModel,
                attributes: ['id', 'type', 'title', 'description'],
                order: [
                    ['create_time', 'DESC']
                ],
                include: [
                    {
                        model: db.AnswerModel,
                        order: [
                            ['position', 'DESC']
                        ]
                    }
                ]
            }
        ]
    });
    return quiz;
};