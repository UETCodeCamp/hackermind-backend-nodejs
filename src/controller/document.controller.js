const response = require('../utils/response');
const Course = require('../action/course');
const db = require('../database');

async function createDocument(req, res) {
    const {chapter_id} = req.params;
    const {title, content} = req.body;
    try{
        const payload = {
            title: title,
            content: content,
            create_time: Date.now(),
            chapter_id: chapter_id
        };
        const document = await db.DocumentModel.create(payload);
        return res.json(response.success({}));
    }
    catch(err){
        console.log("Error: ", err.message);
        return res.json(response.fail(err.message));
    }
}

async function putDocoment(req, res){
    const {chapter_id, document_id} = req.params;
    const {title, content} = req.body;
    try{
        const payload = {
            title: title,
            content: content
        };
        const contrain = {
            id: document_id,
            chapter_id: chapter_id
        };
        const document = await db.DocumentModel.update(payload, {
            where: contrain
        });
        return res.json(response.success({}));
    }
    catch(err){
        console.log("Error: ", err.message);
        return res.json(response.fail(err.message));
    }
}
async function getDocument(req, res){
    const {chapter_id, document_id} = req.params;
    try{
        const contrain = {
            id: document_id,
            chapter_id: chapter_id
        };
        const document = await db.DocumentModel.findOne({
            where: contrain
        });
        return res.json(response.success(document));
    }
    catch(err){
        console.log("Error: ", err.message);
        return res.json(response.fail(err.message));
    }
}

module.exports = {
    createDocument,
    putDocoment,
    getDocument
};