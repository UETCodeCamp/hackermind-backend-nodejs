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

module.exports.getQuiz = async (contrain, user_id, is_do) => {
    let quiz = await db.QuizModel.findOne({
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
    if(is_do){
        let point = 0;
        quiz = quiz.dataValues;
        quiz.questions = quiz.questions.map(e => {
            return e.dataValues
        });
        let i=0;
        for(i=0; i<quiz.questions.length; i++){
            const user_question = await db.UserQuestionModel.findOne({
                where: {
                    user_id: user_id,
                    question_id: quiz.questions[i].id
                }
            });
            if(user_question.is_correct){
                point+=10;
            }
            quiz.questions[i].choose_answer = user_question.dataValues.choose_answer
        }
        quiz.is_do = is_do;
        quiz.point = point;
    }
    return quiz;
};