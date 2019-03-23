const response = require('../utils/response');
const Quiz = require('../action/quiz');
const db = require('../database');

async function createQuiz(req, res) {
      const {chapter_id} = req.params;
      const  {title, description} = req.body;
      const payload = {
          title: title,
          description: description,
          chapter_id: chapter_id,
          create_time: Date.now()
      };
      try{
          const quiz = await Quiz.createQuiz(payload);
          return res.json(response.success({}));
      }
      catch(err){
          console.log("Error: ", err);
          return res.json(response.fail(err.message))
      }
}

async function putQuiz(req, res){
    const {chapter_id, quiz_id} = req.params;
    const  {title, description} = req.body;
    const payload = {
        title: title,
        description: description
    };
    const contrain = {
        id: quiz_id,
        chapter_id: chapter_id
    };
    try{
        const quiz = await Quiz.updateQuiz(contrain,payload);
        return res.json(response.success());
    }
    catch(err){
        console.log("Error: ", err);
        return res.json(response.fail(err.message))
    }
}

async function getQuiz(req, res){
    const {chapter_id, quiz_id} = req.params;
    const contrain = {
        id: quiz_id,
        chapter_id: chapter_id
    };
    try{
        const quiz = await Quiz.getQuiz(contrain);
        return res.json(response.success({quiz}));
    }
    catch(err){
        console.log("Error: ", err);
        return res.json(response.fail(err.message))
    }
}

async function checkQuiz(req, res){
    const {quiz_id} = req.params;
    const {questions} = req.body;
    try{
        let count = 0;
        let i=0;
        for(i=0; i < questions.length; i++){
            let question = await db.QuestionModel.findOne({
                where: {
                    id: questions[i].question_id
                }
            });
            let answer_correct = question.answer_correct.split(',');
            if(answer_correct.length === questions[i].choose_answer.length){
                count++;
            }
            console.log(count);
        }
        return res.json(response.success({}));
    }
    catch(err){
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