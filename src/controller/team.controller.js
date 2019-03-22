const response = require('../utils/response');
const Team = require('../action/team');
const User = require('../action/user');
const db = require('../database');

async function createTeam(req, res) {
    try{
        const {name} = req.body;
        const user_id = req.tokenData.id;
        const team = await Team.createTeam({
            name: name,
            create_time: Date.now()
        });
        const user = await Team.addUserToTeam({
            user_id: user_id,
            team_id: team.id
        });
        return res.json(response.success({}));
    }
    catch(err){
        console.log("Error:", err.message);
        return res.json(response.fail(err.message));
    }
}

async function deleteTeam(req, res){
    try{
        const {team_id} = req.params;
        const team = Team.deleteTeam({team_id: team_id});
        return res.json(response.success({}));
    }
    catch(err){
        console.log("Error:", err.message);
        return res.json(response.fail(err.message));
    }
}

async function putTeam(req, res){
    try{
        const {team_id} = req.params;
        const payload = {
            name: req.body.name
        };
        const team = await Team.putTeam(payload, {id: team_id});
        return res.json(response.success({}));
    }
    catch(err){
        console.log("Error:", err.message);
        return res.json(response.fail(err.message));
    }
}

async function deleteUserInTeam(req, res){
    const {team_id, user_id} = req.params;
    try{
        const contrain = {
            team_id: team_id,
            user_id: user_id
        };
        const user = await Team.findUserInTeam(contrain);
        if(!user){
            throw new Error("Thành viên này không có trong team !");
        }
        else{
            await Team.deleteUserInTeam(contrain);
            return res.json(response.success({}));
        }
    }
    catch(err){
        console.log("Error:", err.message);
        return res.json(response.fail(err.message));
    }
}

async function getUsersInTeam(req, res){
    const {team_id} = req.params;
    try{
        let users = await Team.findUsersInTeam({team_id: team_id});
        users = users.map(e => {
            return e.user;
        });
        return res.json(response.success({users}));
    }
    catch(err){
        console.log("Error:", err.message);
        return res.json(response.fail(err.message));
    }
}

async function addUserToTeam(req, res){
    const {team_id, user_id} = req.body;
    try{
        const contrain = {
            team_id: team_id,
            user_id: user_id
        };
        const team = await db.TeamModel.findOne({
            where: {
                id: team_id
            }
        });
        if(!team){
            throw new Error("Team này không tồn tại .");
        }
        let  user = await User.findUser({id: user_id});
        if(!user){
            throw new Error("Không tồn tại sinh viên này .");
        }
        user = await Team.findUserInTeam(contrain);
        if(user){
           throw new Error("Đã tồn tại trong team .");
        }
        else{
            await Team.addUserToTeam(contrain);
            return res.json(response.success({}));
        }
    }
    catch(err){
        console.log("Error:", err.message);
        return res.json(response.fail(err.message));
    }
}

module.exports = {
    createTeam,
    deleteTeam,
    putTeam,
    deleteUserInTeam,
    getUsersInTeam,
    addUserToTeam
};
