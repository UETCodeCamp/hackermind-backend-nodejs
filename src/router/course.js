const router = require('express').Router();
const Course = require('../controller/course.controller');
const middleware = require('../middleware/verify_access_token');
const Chapter = require('../controller/chapter.controller');
const Video = require('../controller/video.controller');
const Quiz = require('../controller/quiz.controller');

router.get('/', middleware.verifyAccessToken, Course.getAllCourses);
router.post('/', middleware.verifyAccessToken, Course.createCourse);
router.put('/:course_id', middleware.verifyAccessToken, Course.putCourse);
router.post('/teams', middleware.verifyAccessToken, Course.addTeamToCourse);
router.delete('/:course_id/teams/:team_id', middleware.verifyAccessToken, Course.removeTeamFromCourse);


router.get('/:course_id/chapters', middleware.verifyAccessToken, Chapter.getChapters);
router.put('/:course_id/chapters/:chapter_id', middleware.verifyAccessToken, Chapter.putChapter);
router.post('/:course_id/chapters', middleware.verifyAccessToken, Chapter.createChapter);

router.get('/chapters/:chapter_id/videos', middleware.verifyAccessToken, Video.getVideos);
router.get('/chapters/:chapter_id/videos/:video_id', middleware.verifyAccessToken, Video.getVideo);
router.post('/chapters/:chapter_id/videos', middleware.verifyAccessToken, Video.createVideo);
router.put('/chapters/:chapter_id/videos/:video_id', middleware.verifyAccessToken, Video.putVideo);
router.delete('/chapters/:chapter_id/videos/:video_id', middleware.verifyAccessToken, Video.deleteVideo);

router.get('/chapters/:chapter_id/quizzes', middleware.verifyAccessToken, Quiz.getQuizzes);
router.post('/chapters/:chapter_id/quizzes', middleware.verifyAccessToken, Quiz.createQuiz);
router.put('/chapters/:chapter_id/quizzes/:quiz_id', middleware.verifyAccessToken, Quiz.putQuiz);
router.delete('/chapters/:chapter_id/quizzes/:quiz_id', middleware.verifyAccessToken, Quiz.deleteQuiz);

module.exports = router;

