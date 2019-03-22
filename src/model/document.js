module.exports = (sequelize, Sequelize) => {
    const DocumentModel = sequelize.define('documents', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING
        },
        create_time: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.TEXT
        },
        chapter_id: {
            type: Sequelize.INTEGER
        }
    },{
        freezeTableName: true,
        timestamp: false
    });
    return DocumentModel;
};
