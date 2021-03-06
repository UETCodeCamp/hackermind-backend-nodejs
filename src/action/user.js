const db = require('../database');

module.exports.findUserAndTeam = async (contrain) => {
    const team = await db.TeamUserModel.findOne({
        where: {
            user_id: contrain.id
        }
    });
    const user = await db.UserModel.findOne({
        where: contrain,
        attributes: ['user_name','id', 'avatar', 'name', 'email', 'point', 'description', 'role_id']
    });
    if(team){
        user.dataValues.team_id = team.dataValues.team_id;
    }
    return user;
};

module.exports.findUser = async (contrain) => {
    const user = await db.UserModel.findOne({
        where: contrain,
        attributes: ['user_name','id', 'avatar', 'name', 'email', 'point', 'description', 'role_id']
    });
    return user;
};

module.exports.createUser = async (payload) => {
    const user = await db.UserModel.create(payload);
    return user;
};

module.exports.updateUser = async (payload, contrain) => {
    const user = await db.UserModel.update(payload, {
        where: contrain
    })  ;
    return user;
};
