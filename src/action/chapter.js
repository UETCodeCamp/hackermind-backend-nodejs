const db = require('../database');


module.exports.createChapter = async (payload) => {
    const chapter = await db.ChapterModel.create(payload);
    return chapter;
};

module.exports.putChapter = async (contrain, payload) => {
    const chapter = await db.ChapterModel.update(payload, {
        where: contrain
    });
    return chapter;
};

module.exports.getChapter = async (contrain) => {
    const chapters = await db.ChapterModel.findAll({
        where: contrain,
        order: [
            ['create_time', 'DESC']
        ]
    });
    return chapters;
};