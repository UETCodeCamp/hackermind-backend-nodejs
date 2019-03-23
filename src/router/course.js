const router = require('express').Router();
const Course = require('../controller/course.controller');
const middleware = require('../middleware/verify_access_token');
const Chapter = require('../controller/chapter.controller');
const Video = require('../controller/video.controller');
const Question = require('../controller/question.controller');
const Quiz = require('../controller/quiz.controller');
const Document = require('../controller/document.controller');
const Comment = require('../controller/comment.controller');

router.get('/', middleware.verifyAccessToken, Course.getAllCourses);
router.get('/:course_id', middleware.verifyAccessToken, Course.getCourse);
router.post('/', middleware.verifyAccessToken, Course.createCourse);
router.put('/:course_id', middleware.verifyAccessToken, Course.putCourse);
router.post('/teams', middleware.verifyAccessToken, Course.addTeamToCourse);
router.delete('/:course_id/teams/:team_id', middleware.verifyAccessToken, Course.removeTeamFromCourse);
router.get('/:course_id/users', middleware.verifyAccessToken, Course.checkActiveToLearn);

//chapter
router.get('/:course_id/chapters', middleware.verifyAccessToken, Chapter.getChapters);
router.put('/:course_id/chapters/:chapter_id', middleware.verifyAccessToken, Chapter.putChapter);
router.post('/:course_id/chapters', middleware.verifyAccessToken, Chapter.createChapter);

//video
router.get('/chapters/:chapter_id/videos', middleware.verifyAccessToken, Video.getVideos);
router.get('/chapters/:chapter_id/videos/:video_id', middleware.verifyAccessToken, Video.getVideo);
router.post('/chapters/:chapter_id/videos', middleware.verifyAccessToken, Video.createVideo);
router.put('/chapters/:chapter_id/videos/:video_id', middleware.verifyAccessToken, Video.putVideo);
router.delete('/chapters/:chapter_id/videos/:video_id', middleware.verifyAccessToken, Video.deleteVideo);

router.post('/chapters/videos/:video_id/comments', middleware.verifyAccessToken, Comment.createCommentOnVideo);
router.put('/chapters/videos/:video_id/comments/:comment_id', middleware.verifyAccessToken, Comment.putCommentOnVideo);
router.delete('/chapters/videos/:video_id/comments/:comment_id', middleware.verifyAccessToken, Comment.deleteCommentOnVideo);

//doccument
router.post('/chapters/:chapter_id/documents', middleware.verifyAccessToken, Document.createDocument);
router.put('/chapters/:chapter_id/documents/:document_id', middleware.verifyAccessToken, Document.putDocoment);
router.get('/chapters/:chapter_id/documents/:document_id', middleware.verifyAccessToken, Document.getDocument);

//quiz
router.post('/chapters/:chapter_id/quizzes', middleware.verifyAccessToken, Quiz.createQuiz);
router.put('/chapters/:chapter_id/quizzes/:quiz_id', middleware.verifyAccessToken, Quiz.putQuiz);
router.get('/chapters/:chapter_id/quizzes/:quiz_id', middleware.verifyAccessToken, Quiz.getQuiz);

//question
router.post('/chapters/quizzes/:quiz_id/questions', middleware.verifyAccessToken, Question.createQuestion);
router.put('/chapters/quizzes/:quiz_id/questions/:question_id', middleware.verifyAccessToken, Question.putQuestion);
router.delete('/chapters/quizzes/:quiz_id/questions/:question_id', middleware.verifyAccessToken, Question.deleteQuesion);
module.exports = router;

