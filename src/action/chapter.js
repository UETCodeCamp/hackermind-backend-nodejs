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
            ['create_time', 'ASC']
        ],
        include: [
            {
                model: db.VideoModel,
                attributes: ['title', 'id'],
                order: [
                    ['create_time', 'ASC']
                ]
            },
            {
                model: db.QuizModel,
                attributes: ['title', 'id'],
                order: [
                    ['create_time', 'ASC']
                ]
            },
            {
                model: db.DocumentModel,
                attributes: ['title', 'id'],
                order: [
                    ['create_time', 'ASC']
                ]
            }
        ]
    });
    return chapters;
};