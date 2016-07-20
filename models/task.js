module.exports = function(sequelize, DataTypes) {
    return sequelize.define('tasks', {
        title: DataTypes.STRING,
        done: DataTypes.BOOLEAN
    });
};
