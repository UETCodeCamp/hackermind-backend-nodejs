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
    const quiz = await db.QuizModel.findAll({
        where: contrain,
        include: [
            {
                model: db.QuestionModel,
                // attributes: ['id', 'type', 'title', 'description'],
                // order: [
                //     ['create_time', 'DESC']
                // ],
                include: {
                    model: db.AnswerModel,
                    required: false
                    // order: [
                    //     ['position', 'DESC']
                    // ],
                    // limit: 2
                }
            }
        ]
    });
    return quiz;
};