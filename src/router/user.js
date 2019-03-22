const router = require('express').Router();
const User = require('../controller/user.controller');
const middleware = require('../middleware/verify_access_token');


router.post('/register', User.register);
router.post('/login', User.login);
router.get('/profiles', middleware.verifyAccessToken, User.getProfile);
router.put('/profiles', middleware.verifyAccessToken, User.putProfile);
router.get('/teams', middleware.verifyAccessToken, User.getTeams);
router.get('/teams/:team_id/teammates', middleware.verifyAccessToken, User.getTeamMate);
router.put('/roles', middleware.verifyAccessToken, User.changeRole);



module.exports = router;