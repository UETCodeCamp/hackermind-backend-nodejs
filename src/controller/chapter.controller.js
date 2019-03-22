const response = require('../utils/response');
const db = require('../database');
const Chapter = require('../action/chapter');

async function createChapter(req, res) {
    const {course_id} = req.params;
    const {name, description} = req.body;
    try{
        const payload = {
            name: name,
            course_id: course_id,
            create_time: Date.now(),
            description: description
        };
        const chapter = await Chapter.createChapter(payload);
        return res.json(response.success({}));
    }
    catch(err){
        console.log("Error: ", err);
        return res.json(response.fail(err.message));
    }
}

async function putChapter(req, res) {
    const {course_id, chapter_id} = req.params;
    const {name} = req.body;
    try{
        const contrain = {
            course_id: course_id,
            id: chapter_id
        };
        const chapter = await Chapter.putChapter(contrain,{name: name});
        return res.json(response.success({}));
    }
    catch(err){
        console.log("Error: ", err);
        return res.json(response.fail(err.message));
    }
}

async function getChapters(req, res) {
    const {course_id} = req.params;
    try{
        const chapters = await Chapter.getChapter({course_id: course_id});
        return res.json(response.success({chapters}));
    }
    catch(err){
        console.log("Error: ", err);
        return res.json(response.fail(err.message));
    }
}

async function deleteChapter(req, res){
    const {course_id, chapter_id} = req.params;
    try{
        const chapters = await Chapter.getChapter({course_id: course_id});
        return res.json(response.success({chapters}));
    }
    catch(err){
        console.log("Error: ", err);
        return res.json(response.fail(err.message));
    }
}


module.exports = {
    getChapters,
    createChapter,
    putChapter
};