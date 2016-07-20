var models  = require('./models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
    models.tasks.findAll().then(function(tasks) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(tasks));
    });
});

router.post('/', function(req, res) {
    models.tasks.create({
        title: req.body.title,
        done: req.body.done
    }).then(function() {
        res.sendStatus(200);
    });
});

router.put('/:id', function(req, res) {
    models.tasks.update({
        done: req.body.done
    }, {
        where: {
            id: req.params.id
        }
    }).then(function() {
        res.sendStatus(200);
    });
});

router.delete('/:id', function(req, res) {
    models.tasks.destroy({
        where: {
            id: req.params.id
        }
    }).then(function() {
        res.sendStatus(200);
    });
})

module.exports = router;
