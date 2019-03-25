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
        type: {
            type: {
                type:   Sequelize.ENUM,
                values: ['markdown', 'pdf']
            },
        },
        create_time: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.TEXT
        },
        chapter_id: {
            type: Sequelize.INTEGER
        },
        url: {
            type: Sequelize.TEXT
        }
    },{
        freezeTableName: true,
        timestamp: false
    });
    return DocumentModel;
};
