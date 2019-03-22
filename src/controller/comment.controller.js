const response = require('../utils/response');
const db = require('../database');

async function createCommentOnVideo(req, res) {
    const {video_id} = req.params;
    const {content, image} = req.body;
    const payload = {
        content: content,
        image: image,
        user_id: req.tokenData.id,
        reference_id: video_id,
        type: "video",
        create_time: Date.now()
    };
    try{
        const comment = await db.ThreadModel.create(payload);
        return res.json(response.success({}));
    }
    catch(err){
        console.log("Error: ", err);
        return res.json(response.fail(err.message));
    }
}

async function deleteCommentOnVideo(req, res) {
    const {video_id, comment_id} = req.params;
    const contrain = {
        reference_id: video_id,
        id: comment_id,
        type: 'video'
    };
    try{
        const comment = await db.ThreadModel.destroy({
            where: contrain
        });
        return res.json(response.success({}));
    }
    catch(err){
        console.log("Error: ", err);
        return res.json(response.fail(err.message));
    }
}

async function putCommentOnVideo(req, res) {
    const {video_id, comment_id} = req.params;
    const {content, image} = req.body;
    const payload = {
        content: content,
        image: image
    };
    const contrain = {
        reference_id: video_id,
        id: comment_id,
        type: 'video'
    };
    try{
        const comment = await db.ThreadModel.update(payload, {
            where: contrain
        });
        return res.json(response.success({}));
    }
    catch(err){
        console.log("Error: ", err);
        return res.json(response.fail(err.message));
    }
}

module.exports = {
    createCommentOnVideo,
    deleteCommentOnVideo,
    putCommentOnVideo
};