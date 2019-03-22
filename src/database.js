const Sequelize = require('sequelize');
const config = require('config');
const info = config.get('database');
const db = {};

const sequelize = new Sequelize(
    info.name,
    info.user,
    info.password, {
        host: info.host,
        dialect: 'mysql',
        operatorsAliases: false,
        pool: {
            max: 300,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
            timestamps: false,
            freezeTableName: false
        },
        logging: false
    }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// model
db.UserModel = require('./model/user')(sequelize, Sequelize);
db.CourseModel = require('./model/course')(sequelize, Sequelize);
db.ChapterModel = require('./model/chapter')(sequelize, Sequelize);
db.RoleModel = require('./model/role')(sequelize, Sequelize);
db.TeamModel = require('./model/team')(sequelize, Sequelize);
db.TeamUserModel = require('./model/team_user')(sequelize, Sequelize);
db.TeamCourseModel = require('./model/team_course')(sequelize, Sequelize);
db.ThreadModel = require('./model/thread')(sequelize, Sequelize);
db.VideoModel = require('./model/video')(sequelize, Sequelize);
db.QuestionModel = require('./model/question')(sequelize, Sequelize);
db.AnswerModel = require('./model/answer')(sequelize, Sequelize);
db.QuizModel = require('./model/quiz')(sequelize, Sequelize);
db.DocumentModel = require('./model/document')(sequelize, Sequelize);

/* associations */

//Role-User
db.RoleModel.hasMany(db.UserModel, {foreignKey: 'role_id', sourceKey: 'id'});
db.UserModel.belongsTo(db.RoleModel, {foreignKey: 'role_id', targetKey: 'id'});


//User-Team
db.UserModel.hasMany(db.TeamUserModel, {foreignKey: 'user_id', sourceKey: 'id'});
db.TeamUserModel.belongsTo(db.UserModel, {foreignKey: 'user_id', targetKey: 'id'});
db.TeamModel.hasMany(db.TeamUserModel, {foreignKey: 'team_id', sourceKey: 'id'});
db.TeamUserModel.belongsTo(db.TeamModel, {foreignKey: 'team_id', targetKey: 'id'});


//Team-Course
db.TeamModel.hasMany(db.TeamCourseModel, {foreignKey: 'team_id', sourceKey: 'id'});
db.TeamCourseModel.belongsTo(db.TeamModel, {foreignKey: 'team_id', targetKey: 'id'});
db.CourseModel.hasMany(db.TeamCourseModel, {foreignKey: 'course_id', sourceKey: 'id'});
db.TeamCourseModel.belongsTo(db.CourseModel, {foreignKey: 'course_id', targetKey: 'id'});

//Course-Chapter
db.CourseModel.hasMany(db.ChapterModel, {foreignKey: 'course_id', sourceKey: 'id'});
db.ChapterModel.belongsTo(db.CourseModel, {foreignKey: 'course_id', targetKey: 'id'});

//Chapter-Video
db.ChapterModel.hasMany(db.VideoModel, {foreignKey: 'chapter_id', sourceKey: 'id'});
db.VideoModel.belongsTo(db.ChapterModel, {foreignKey: 'chapter_id', targetKey: 'id'});

//Chapter-Document
db.ChapterModel.hasMany(db.DocumentModel, {foreignKey: 'chapter_id', sourceKey: 'id'});
db.DocumentModel.belongsTo(db.ChapterModel, {foreignKey: 'chapter_id', targetKey: 'id'});

//User-Thread
db.UserModel.hasMany(db.ThreadModel, {foreignKey: 'user_id', sourceKey: 'id'});
db.ThreadModel.belongsTo(db.UserModel, {foreignKey: 'user_id', targetKey: 'id'});

//Chapter-Quiz
db.ChapterModel.hasMany(db.QuizModel, {foreignKey: 'chapter_id', sourceKey: 'id'});
db.QuizModel.belongsTo(db.ChapterModel, {foreignKey: 'chapter_id', targetKey: 'id'});

//Quiz-Question
db.QuizModel.hasMany(db.QuestionModel, {foreignKey: 'quiz_id', sourceKey: 'id'});
db.QuestionModel.belongsTo(db.QuizModel, {foreignKey: 'quiz_id', targetKey: 'id'});

//Question-answer
db.QuestionModel.hasMany(db.AnswerModel, {foreignKey: 'question_id', sourceKey: 'id'});
db.AnswerModel.belongsTo(db.QuestionModel, {foreignKey: 'question_id', targetKey: 'id'});


module.exports = db;