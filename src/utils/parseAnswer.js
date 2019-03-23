module.exports.parseAnswer = (choose_answers, answer_correct) =>{
    answer_correct = answer_correct.split(',');
    if(answer_correct.length !== choose_answers.length){
        return false;
    }
    answer_correct = answer_correct.sort(function(a, b){return a-b});
    choose_answers = choose_answers.sort(function(a, b){return a-b});
    let i=0;
    for(i=0; i < choose_answers.length; i++){
        if(choose_answers[i] != answer_correct[i]){
            return false;
        }
    }
    return true;
};
