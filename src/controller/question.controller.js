const response = require('../utils/response');
const Question = require('../action/question');
const db = require('../database');

async function createQuestion(req, res) {
    const {title, type, image, answer_correct, answer, description} = req.body;
    const {quiz_id} = req.params;
    try{
        let payload = {
            title: title,
            description: description,
            answer_correct: answer_correct.toString(),
            quiz_id: quiz_id,
            type: type,
            create_time: Date.now(),
            image: image
        };
        const question = await Question.createQuestion(payload);
        let i=0;
        for(i=0; i< answer.length; i++){
            await db.AnswerModel.create({
                question_id: question.id,
                content: answer[i].content,
                position: answer[i].position
            })
        }
        return res.json(response.success({}));
    }
    catch(err){
        console.log("Error:", err.message);
        return res.json(response.fail(err.message));
    }
}

async function putQuestion(req, res){
    const {title, type, image, answer_correct, answer, description} = req.body;
    const {quiz_id, question_id} = req.params;
    try{
        let payload = {
            title: title,
            description: description,
            answer_correct: answer_correct.toString(),
            type: type,
            image: image
        };
        const question = await Question.updateQuestion({id: question_id, quiz_id: quiz_id}, payload);
        let i=0;
        const oldAnswer = await db.AnswerModel.destroy({
            where: {
                question_id: question_id
            }
        });
        for(i=0; i< answer.length; i++){
            await db.AnswerModel.create({
                question_id: question_id,
                content: answer[i].content,
                position: answer[i].position
            })
        }
        return res.json(response.success({}));
    }
    catch(err){
        console.log("Error:", err.message);
        return res.json(response.fail(err.message));
    }
}


async function deleteQuesion(req, res){
    const {question_id, quiz_id} = req.params;
    try{
        const contrain = {
            id: question_id,
            quiz_id: quiz_id
        };
        const question = await Question.deleteQuestion(contrain);
        return res.json(response.success({}));
    }
    catch(err){
        console.log("Error:", err.message);
        return res.json(response.fail(err.message));
    }
}

module.exports = {
    createQuestion,
    putQuestion,
    deleteQuesion
};

