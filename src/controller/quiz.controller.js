const response = require('../utils/response');
const Quiz = require('../action/quiz');
async function createQuiz(req, res) {
    const {question, url, description, answer_one, answer_two, answer_three, answer_four, answer_correct} = req.body;
    const {chapter_id} = req.params;
    const payload = {
        question: question,
        url: url,
        description: description,
        answer_correct: answer_correct,
        answer_four: answer_four,
        answer_one:answer_one,
        answer_two: answer_two,
        answer_three: answer_three,
        chapter_id: chapter_id
    };
    try{
        const quiz = await Quiz.createQuiz(payload);
        return res.json(response.success({}));
    }
    catch(err){
        console.log("Error:", err.message);
        return res.json(response.fail(err.message));
    }
}

async function putQuiz(req, res){
    const {question, url, description, answer_one, answer_two, answer_three, answer_four, answer_correct} = req.body;
    const {chapter_id, quiz_id} = req.params;
    const payload = {
        question: question,
        url: url,
        description: description,
        answer_correct: answer_correct,
        answer_four: answer_four,
        answer_one:answer_one,
        answer_two: answer_two,
        answer_three: answer_three
    };
    const contrain = {
        chapter_id: chapter_id,
        id: quiz_id
    };
    try{
        const quiz = await Quiz.putQuiz(contrain, payload);
        return res.json(response.success({}));
    }
    catch(err){
        console.log("Error:", err.message);
        return res.json(response.fail(err.message));
    }
}

async function getQuizzes(req, res) {
    const {chapter_id} = req.params;
    try{
        const quizzes = await Quiz.getQuizzes({chapter_id: chapter_id});
        return res.json(response.success(quizzes));
    }
    catch(err){
        console.log("Error:", err.message);
        return res.json(response.fail(err.message));
    }
}

async function deleteQuiz(req, res){
    const {quiz_id, chapter_id} = req.params;
    try{
        const contrain = {
            id: quiz_id,
            chapter_id: chapter_id
        };
        const quiz = await Quiz.deleteQuiz(contrain);
        return res.json(response.success({}));
    }
    catch(err){
        console.log("Error:", err.message);
        return res.json(response.fail(err.message));
    }
}

module.exports = {
    createQuiz,
    getQuizzes,
    deleteQuiz,
    putQuiz
};

