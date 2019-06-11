var express = require('express');
var router = express.Router();
var mustache = require("mustache");
var fs = require("fs");

var Movie = require('../Models/Movie.js');
var Category = require('../Models/Category.js');
var Director = require('../Models/Director.js');
var Actor = require('../Models/Actor.js');

router.get("/Movie", function(req, res) {
    Movie.all(function(rows) {
        res.json(rows);
    });
});

router.get("/Category", function(req, res) {
    Category.all(function(rows) {
        res.json(rows);
    });
});

router.get("/Director", function(req, res) {
    Director.all(function(rows) {
        res.json(rows);
    });
});

router.get("/Actor", function(req, res) {
    Actor.all(function(rows) {
        res.json(rows);
    });
});


module.exports = router;