const db = require('../database');


module.exports.createVideo = async (payload) => {
    const video = await db.VideoModel.create(payload);
    return video;
};

module.exports.putVideo = async (contrain, payload) => {
    const video = await db.VideoModel.update(payload, {
        where: contrain
    });
    return video;
};

module.exports.getVideos = async (contrain) => {
    const videos = await db.VideoModel.findAll({
        where: contrain,
        order: [
            ['create_time', 'ASC']
        ]
    });
    return videos;
};


module.exports.getVideo = async (contrain) => {
    let video = await db.VideoModel.findOne({
        where: contrain

    });
    let comments = await db.ThreadModel.findAll({
        where: {
            reference_id: contrain.id,
            type: 'video'
        },
        include: {
            model: db.UserModel,
            required: true,
            attributes: ['name', 'avatar', 'id']
        }
    });
    comments = comments.map(e => {
        return e.dataValues
    });
    return {video, comments};
};

module.exports.deleteVideo = async (contrain) => {
    const comments = await db.ThreadModel.destroy({
        where: {
            reference_id: contrain.id,
            type: 'video'
        }
    });
    const video = await db.VideoModel.destroy({
        where: contrain
    });
    return video;
};