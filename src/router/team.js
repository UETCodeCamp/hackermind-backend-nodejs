const router = require('express').Router();
const Team = require('../controller/team.controller');
const middleware = require('../middleware/verify_access_token');

router.post('/', middleware.verifyAccessToken, Team.createTeam);
router.delete('/:team_id', middleware.verifyAccessToken, Team.deleteTeam);
router.put('/:team_id', middleware.verifyAccessToken, Team.putTeam);
router.delete('/:team_id/users/:user_id', middleware.verifyAccessToken, Team.deleteUserInTeam);
router.get('/:team_id/users', middleware.verifyAccessToken, Team.getUsersInTeam);
router.post('/teams/users', middleware.verifyAccessToken, Team.addUserToTeam);


module.exports = router;

