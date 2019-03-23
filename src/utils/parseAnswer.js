module.exports.parseAnswer = (choose_answers, correct_answers) =>{
    correct_answers = correct_answers.split(',');
    if(correct_answers.length !== choose_answers.length){
        return false;
    }
    correct_answers = correct_answers.sort(function(a, b){return a-b});
    choose_answers = choose_answers.sort(function(a, b){return a-b});
    let i=0;
    for(i=0; i < choose_answers.length; i++){
        if(choose_answers[i] !== correct_answers[i]){
            return false;
        }
    }
    return true;
};
