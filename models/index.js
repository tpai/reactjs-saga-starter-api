var fs        = require("fs");
var path      = require("path");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS, {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
);
var db        = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// sequelize.sync().then(function() {
//     Task.create({ title: 'TODO A', done: false });
//     Task.create({ title: 'TODO B', done: true });
//     Task.create({ title: 'TODO C', done: false });
//     Task.create({ title: 'TODO D', done: true });
//     return ;
// });
