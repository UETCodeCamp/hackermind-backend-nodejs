const response = require('../utils/response');
const Quiz = require('../action/quiz');
const db = require('../database');
const Check = require('../utils/parseAnswer');

async function createQuiz(req, res) {
    const {chapter_id} = req.params;
    const {title, description} = req.body;
    const payload = {
        title: title,
        description: description,
        chapter_id: chapter_id,
        create_time: Date.now()
    };
    try {
        const quiz = await Quiz.createQuiz(payload);
        return res.json(response.success({}));
    } catch (err) {
        console.log("Error: ", err);
        return res.json(response.fail(err.message))
    }
}

async function putQuiz(req, res) {
    const {chapter_id, quiz_id} = req.params;
    const {title, description} = req.body;
    const payload = {
        title: title,
        description: description
    };
    const contrain = {
        id: quiz_id,
        chapter_id: chapter_id
    };
    try {
        const quiz = await Quiz.updateQuiz(contrain, payload);
        return res.json(response.success());
    } catch (err) {
        console.log("Error: ", err);
        return res.json(response.fail(err.message))
    }
}

async function getQuiz(req, res) {
    const {chapter_id, quiz_id} = req.params;
    const contrain = {
        id: quiz_id,
        chapter_id: chapter_id
    };
    let user_question;
    const question = await db.QuestionModel.findOne({
        where: {
            quiz_id: quiz_id
        }
    });
    if(question){
        user_question = await db.UserQuestionModel.findOne({
            where: {
                user_id: req.tokenData.id,
                question_id: question.id
            }
        })
    }
    try {
        let is_do = false;
        if(user_question){
            is_do = true
        }
        const quiz = await Quiz.getQuiz(contrain, req.tokenData.id, is_do);
        return res.json(response.success({quiz}));
    } catch (err) {
        console.log("Error: ", err);
        return res.json(response.fail(err.message))
    }
}

async function checkQuiz(req, res) {
    const {quiz_id} = req.params;
    const {questions} = req.body;
    try {
        let is_did = false;
        let user_question = await db.UserQuestionModel.findOne({
            where: {
                user_id: req.tokenData.id,
                question_id: questions[0].question_id
            }
        });
        if(user_question){
            is_did = true
        }
        let point = 0;
        let i = 0;
        for (i = 0; i < questions.length; i++) {
            let question = await db.QuestionModel.findOne({
                where: {
                    id: questions[i].question_id,
                    quiz_id: quiz_id
                }
            });
            let kq = Check.parseAnswer(questions[i].choose_answer, question.answer_correct);
            let success = (kq) ? "true" : "false" ;
            await db.UserQuestionModel.findOrCreate({
                where: {
                    user_id: req.tokenData.id,
                    question_id: questions[i].question_id
                },
                defaults: {
                    user_id: req.tokenData.id,
                    question_id: questions[i].question_id,
                    is_correct: success,
                    choose_answer: questions[i].choose_answer.toString()
                }
            });
            if(kq){
                point+=10;
            }
            if(kq && !is_did){
                let user = await db.UserModel.findOne({
                    where: {
                        id: req.tokenData.id
                    }
                });
                await db.UserModel.update({
                    point: 10 + user.dataValues.point
                },{
                    where: {
                        id: req.tokenData.id
                    }
                })
            }
        }
        return res.json(response.success({point: point}));
    } catch (err) {
        console.log("Error: ", err);
        return res.json(response.fail(err.message))
    }
}

module.exports = {
    createQuiz,
    putQuiz,
    getQuiz,
    checkQuiz
};