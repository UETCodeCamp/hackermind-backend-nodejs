module.exports = (sequelize, Sequelize) => {
    const QuestionModel = sequelize.define('questions', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type:   Sequelize.ENUM,
            values: ['checkbox', 'ratio']
        },
        create_time: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.TEXT
        },
        title: {
            type: Sequelize.STRING
        },
        answer_correct: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        quiz_id: {
            type: Sequelize.INTEGER
        }
    },{
        freezeTableName: true,
        timestamp: false
    });
    return QuestionModel;
};