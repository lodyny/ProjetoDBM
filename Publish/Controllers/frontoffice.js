var express = require('express');
var router = express.Router();
var mustache = require("mustache");
var fs = require("fs");

var Movie = require('../Models/Movie.js');
var Category = require('../Models/Category.js');
var Director = require('../Models/Director.js');
var Actor = require('../Models/Actor.js');

router.get('/Home', function(req, res){
    Movie.top("name", "DESC", 3, function (rows) {
        console.log(rows);
        
        var template = fs.readFileSync("./Publish/Views/home.mustache").toString();

        var template_config = {
            title: 'Frontoffice',
            menu: getMenu(),
            rows: rows.map(obj => {
                return {
                    properties: Object.keys(obj).map(key => {
                        return {
                            name: key,
                            value: obj[key]
                        }
                    }),
                    columns: Object.keys(new Movie()).map(key => {
                        return {
                            name: key
                        };
                    })
                }
            })
        };

        var output = mustache.render(template, template_config);
        res.send(output);

    });
});

function getMenu (){
    var menu = fs.readFileSync("./Publish/Views/menu.mustache").toString();

    schemas = [];
    var config = JSON.parse(fs.readFileSync("./Server/config.json"));

    config.schemas.forEach(model => {
        schemas.push(model);
    });

    var menu_config = {
        schemas: schemas
    }

    return mustache.render(menu, menu_config);
}

module.exports = router;