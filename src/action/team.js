const db = require('../database');


module.exports.createTeam = async (payload) => {
    const team = await db.TeamModel.create(payload);
    return team;
};

module.exports.addUserToTeam = async (payload) => {
      const result = db.TeamUserModel.create(payload);
      return result;
};

module.exports.findTeams = async (contrain) => {
    const user_team = await db.TeamUserModel.findAll({
        where: contrain,
        include: [
            { model: db.TeamModel, required: true}
        ]
    });
    return user_team;
};

module.exports.deleteTeam = async (contrain) => {
    try{
        const userInTeam = await db.TeamUserModel.destroy({
            where: contrain
        });
        const courseOfTeam = await db.TeamCourseModel.destroy({
            where: contrain
        });
        const team = await db.TeamModel.destroy({
            where: {
                id: contrain.team_id
            }
        }) ;
        return team;
    }
    catch (e) {
        throw new Error(`Error when delete Team: ${e.message} `);
    }
};

module.exports.putTeam = async (payload, contrain) => {
    const team = await db.TeamModel.update(payload, {
        where: contrain
    });
    return team;
};

module.exports.findUserInTeam = async (contrain) => {
    const user = await db.TeamUserModel.findOne({
        where: contrain
    }) ;
    return user;
};

module.exports.findUsersInTeam = async (contrain) => {
    const users = await db.TeamUserModel.findAll({
        where: contrain,
        include: [
            {
                model: db.UserModel, required: true,
                attributes: ['name', 'point', 'email', 'avatar', 'id', 'role_id']
            },
        ],
    }) ;
    return users;
};


module.exports.deleteUserInTeam = async (contrain) => {
    const user = await db.TeamUserModel.destroy({
        where: contrain
    });
    return user;
};


module.exports.getTeamMate = async (contrain) => {
    const team = await db.TeamModel.findOne({
        where: {
            id: contrain.team_id
        }
    });
    const team_users = await db.TeamUserModel.findAll({
        where: contrain
    });
    let user_id = team_users.map(e => {
        return e.dataValues.user_id
    });
    const users = await db.UserModel.findAll({
        where: {
            id: {
                [db.Sequelize.Op.in]: user_id
            }
        },
        attributes: ['name', 'avatar', 'email', 'role_id']
    });
    team.dataValues.users = users;
    return team;
};

