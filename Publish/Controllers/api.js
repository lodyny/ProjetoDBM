var express = require('express');
var router = express.Router();

var Movie = require('../Models/Movie.js');
var Category = require('../Models/Category.js');
var Director = require('../Models/Director.js');
var Actor = require('../Models/Actor.js');
var Movie = require('../Models/Movie.js');
var Category = require('../Models/Category.js');
var Director = require('../Models/Director.js');
var Actor = require('../Models/Actor.js');

function mapping(object, type) {
    var obj = new type();
    Object.getOwnPropertyNames(object).forEach(function (value) {
    if (obj.hasOwnProperty(value)) //Se o objeto possuir o atributo que se está a verificar então recebe o valor retornado da query da base de dados
        obj[value] = object[value];
    });
    return obj;
}

router.post("/Movie", function(req, res) {
    var obj = mapping(req.body, Movie);
    obj.save(function(err) {
        res.status(200).json({
            success: !err
        });
    });
});

router.put("/Movie/:id", function(req, res) {
    var obj = mapping(req.body, Movie);
    obj.id = req.params.id;
    obj.save(function(err) {
        res.status(200).json({
            success: !err
        });
    });
});

router.get("/Movie", function(req, res) {

    Movie.all(function(rows) {
        res.json(rows);
    });
});

router.get("/Movie/:id", function(req, res) {
    Movie.get(req.params.id, function(row) {
        res.json(row);
    });
});


router.delete("/Movie/:id", function(req, res) {
    Movie.delete(req.params.id, function(err) {
        res.status(200).json({
            success: !err
        });
    });
});
router.post("/Category", function(req, res) {
    var obj = mapping(req.body, Category);
    obj.save(function(err) {
        res.status(200).json({
            success: !err
        });
    });
});

router.put("/Category/:id", function(req, res) {
    var obj = mapping(req.body, Category);
    obj.id = req.params.id;
    obj.save(function(err) {
        res.status(200).json({
            success: !err
        });
    });
});

router.get("/Category", function(req, res) {

    Category.all(function(rows) {
        res.json(rows);
    });
});

router.get("/Category/:id", function(req, res) {
    Category.get(req.params.id, function(row) {
        res.json(row);
    });
});


router.delete("/Category/:id", function(req, res) {
    Category.delete(req.params.id, function(err) {
        res.status(200).json({
            success: !err
        });
    });
});
router.post("/Director", function(req, res) {
    var obj = mapping(req.body, Director);
    obj.save(function(err) {
        res.status(200).json({
            success: !err
        });
    });
});

router.put("/Director/:id", function(req, res) {
    var obj = mapping(req.body, Director);
    obj.id = req.params.id;
    obj.save(function(err) {
        res.status(200).json({
            success: !err
        });
    });
});

router.get("/Director", function(req, res) {

    Director.all(function(rows) {
        res.json(rows);
    });
});

router.get("/Director/:id", function(req, res) {
    Director.get(req.params.id, function(row) {
        res.json(row);
    });
});


router.delete("/Director/:id", function(req, res) {
    Director.delete(req.params.id, function(err) {
        res.status(200).json({
            success: !err
        });
    });
});
router.post("/Actor", function(req, res) {
    var obj = mapping(req.body, Actor);
    obj.save(function(err) {
        res.status(200).json({
            success: !err
        });
    });
});

router.put("/Actor/:id", function(req, res) {
    var obj = mapping(req.body, Actor);
    obj.id = req.params.id;
    obj.save(function(err) {
        res.status(200).json({
            success: !err
        });
    });
});

router.get("/Actor", function(req, res) {

    Actor.all(function(rows) {
        res.json(rows);
    });
});

router.get("/Actor/:id", function(req, res) {
    Actor.get(req.params.id, function(row) {
        res.json(row);
    });
});


router.delete("/Actor/:id", function(req, res) {
    Actor.delete(req.params.id, function(err) {
        res.status(200).json({
            success: !err
        });
    });
});
router.post("/Movie", function(req, res) {
    var obj = mapping(req.body, Movie);
    obj.save(function(err) {
        res.status(200).json({
            success: !err
        });
    });
});

router.put("/Movie/:id", function(req, res) {
    var obj = mapping(req.body, Movie);
    obj.id = req.params.id;
    obj.save(function(err) {
        res.status(200).json({
            success: !err
        });
    });
});

router.get("/Movie", function(req, res) {

    Movie.all(function(rows) {
        res.json(rows);
    });
});

router.get("/Movie/:id", function(req, res) {
    Movie.get(req.params.id, function(row) {
        res.json(row);
    });
});


router.delete("/Movie/:id", function(req, res) {
    Movie.delete(req.params.id, function(err) {
        res.status(200).json({
            success: !err
        });
    });
});
router.post("/Category", function(req, res) {
    var obj = mapping(req.body, Category);
    obj.save(function(err) {
        res.status(200).json({
            success: !err
        });
    });
});

router.put("/Category/:id", function(req, res) {
    var obj = mapping(req.body, Category);
    obj.id = req.params.id;
    obj.save(function(err) {
        res.status(200).json({
            success: !err
        });
    });
});

router.get("/Category", function(req, res) {

    Category.all(function(rows) {
        res.json(rows);
    });
});

router.get("/Category/:id", function(req, res) {
    Category.get(req.params.id, function(row) {
        res.json(row);
    });
});


router.delete("/Category/:id", function(req, res) {
    Category.delete(req.params.id, function(err) {
        res.status(200).json({
            success: !err
        });
    });
});
router.post("/Director", function(req, res) {
    var obj = mapping(req.body, Director);
    obj.save(function(err) {
        res.status(200).json({
            success: !err
        });
    });
});

router.put("/Director/:id", function(req, res) {
    var obj = mapping(req.body, Director);
    obj.id = req.params.id;
    obj.save(function(err) {
        res.status(200).json({
            success: !err
        });
    });
});

router.get("/Director", function(req, res) {

    Director.all(function(rows) {
        res.json(rows);
    });
});

router.get("/Director/:id", function(req, res) {
    Director.get(req.params.id, function(row) {
        res.json(row);
    });
});


router.delete("/Director/:id", function(req, res) {
    Director.delete(req.params.id, function(err) {
        res.status(200).json({
            success: !err
        });
    });
});
router.post("/Actor", function(req, res) {
    var obj = mapping(req.body, Actor);
    obj.save(function(err) {
        res.status(200).json({
            success: !err
        });
    });
});

router.put("/Actor/:id", function(req, res) {
    var obj = mapping(req.body, Actor);
    obj.id = req.params.id;
    obj.save(function(err) {
        res.status(200).json({
            success: !err
        });
    });
});

router.get("/Actor", function(req, res) {

    Actor.all(function(rows) {
        res.json(rows);
    });
});

router.get("/Actor/:id", function(req, res) {
    Actor.get(req.params.id, function(row) {
        res.json(row);
    });
});


router.delete("/Actor/:id", function(req, res) {
    Actor.delete(req.params.id, function(err) {
        res.status(200).json({
            success: !err
        });
    });
});

module.exports = router;