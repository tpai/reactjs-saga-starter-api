require('dotenv').config();

var fs = require('fs');
var db = require('./models');
var express = require('express');
var path = require('path');
var app = express();
var http = require('http').createServer(app);
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With',
  );

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/tasks', require('./route'));
app.get('/swagger', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/yaml',
  });
  fs.readFile('swagger.yaml', 'utf8', function(err, data) {
    if (err) throw err;
    res.write(data);
    res.end();
  });
});

db.sequelize.sync().then(function() {
  console.log('Database sync complete!');
  http.listen(port, function() {
    console.log('GET /tasks');
    console.log('POST /tasks');
    console.log('PUT /tasks/:id');
    console.log('DELETE /tasks/:id');
  });
});

// db.sequelize
//   .authenticate()
//   .then(function(err) {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(function(err) {
//     console.log('Unable to connect to the database:', err);
//   });
