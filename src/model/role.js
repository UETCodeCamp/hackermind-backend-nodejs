module.exports = (sequelize, Sequelize) => {
    const RoleModel = sequelize.define('roles', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        }
    },{
        freezeTableName: true,
        timestamp: false
    });
    return RoleModel;
};