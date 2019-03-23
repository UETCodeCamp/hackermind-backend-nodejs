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
    console.log(contrain);
    const quiz = await db.QuizModel.findOne({
        where: contrain,
        include: [
            {
                model: db.QuestionModel,
                attributes: ['id', 'type', 'title', 'description'],
                include: [
                    {
                        model: db.AnswerModel,
                        attributes: ['position', 'content', 'question_id']
                    }
                ],
                order: [
                    [db.AnswerModel, 'position', 'ASC']
                ]
            }
        ],
        order: [
            [db.QuestionModel, 'create_time', 'ASC']
        ]
    });
    return quiz;
};