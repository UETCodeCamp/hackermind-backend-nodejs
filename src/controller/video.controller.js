const response = require('../utils/response');
const db = require('../database');
const Video = require('../action/video');

async function createVideo(req, res) {
    try{
        const {chapter_id} = req.params;
        let {title, url, description} = req.body;
        if(url){
            url = url.split('v=')[1];
            let ampersandPosition = url.indexOf('&');
            if(ampersandPosition != -1) {
                url = url.substring(0, ampersandPosition);
            }
        }
        const payload = {
            title: title,
            url: url,
            description: description,
            create_time: Date.now(),
            chapter_id: chapter_id
        };
        const chapter = await db.ChapterModel.findOne({
            where: {
                id: chapter_id
            }
        });
        if(!chapter){
            throw new Error("Chapter không tồn tại.");
        }
        const video = await Video.createVideo(payload);
        return res.json(response.success({}));
    }
    catch(err){
        console.log("Error: ", err.message);
        return res.json(response.fail(err.message));
    }
}

async function putVideo() {
    try{
        const {chapter_id, video_id} = req.params;
        const {title, url, description} = req.body;
        const payload = {
            title: title,
            url: url,
            description: description
        };
        const contrain = {
            chapter_id: chapter_id,
            id: video_id
        };
        const video = await Video.putVideo(contrain, payload);
        return res.json(response.success({}));
    }
    catch(err){
        console.log("Error: ", err.message);
        return res.json(response.fail(err.message));
    }
}


async function getVideos(req, res) {
    try{
        const {chapter_id} = req.params;
        const videos = await Video.getVideos({chapter_id: chapter_id});
        return res.json(response.success({videos}));
    }
    catch(err){
        console.log("Error: ", err.message);
        return res.json(response.fail(err.message));
    }
}

async function getVideo(req, res) {
    try{
        const {chapter_id, video_id} = req.params;
        const contrain = {
            chapter_id: chapter_id,
            id: video_id
        };
        const data = await Video.getVideo(contrain);
        return res.json(response.success(data));
    }
    catch(err){
        console.log("Error: ", err.message);
        return res.json(response.fail(err.message));
    }
}

async function deleteVideo(req, res){
    try{
        const {chapter_id, video_id} = req.params;
        const contrain = {
            chapter_id: chapter_id,
            id: video_id
        };
        const video = await Video.deleteVideo(contrain);
        return res.json(response.success({}));
    }
    catch(err){
        console.log("Error: ", err.message);
        return res.json(response.fail(err.message));
    }
}

module.exports = {
    getVideos,
    getVideo,
    createVideo,
    putVideo,
    deleteVideo
};