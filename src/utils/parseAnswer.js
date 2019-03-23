module.exports.parseAnswer = (choose_answers, correct_answers) =>{
    correct_answers = correct_answers.split(',');
    if(correct_answers.length !== choose_answers.length){
        return false;
    }

};