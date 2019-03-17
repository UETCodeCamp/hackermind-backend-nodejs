module.exports = (sequelize, Sequelize) => {
    const VideoModel = sequelize.define('videos', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        url: {
            type: Sequelize.STRING
        },
        create_time: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        chapter_id: {
            type: Sequelize.INTEGER
        }
    },{
        freezeTableName: true,
        timestamp: false
    });
    return VideoModel;
};