const api = require('express').Router();
const user_router = require('./user');
const team_router = require('./team');
const course_router = require('./course');
const Tool = require('../utils/addStudentsToDatabase');

api.use('/users', user_router);
api.use('/teams', team_router);
api.use('/courses', course_router);
api.post('/students', Tool.autoAdd);

module.exports = api;