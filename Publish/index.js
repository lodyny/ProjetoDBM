var express = require("express");
var mustache = require('mustache');
var mustacheExpress = require('mustache-express');
var app = express();
var fs = require('fs');
const bodyParser = require("body-parser");
const api = require('./Controllers/api.js');
const backOffice = require('./Controllers/backoffice.js');
const frontOffice = require('./Controllers/frontoffice.js');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/Views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', api);
app.use('/backoffice', backOffice);
app.use('/frontoffice', frontOffice);

app.get('/', function(req, res){
    var template = fs.readFileSync("./Publish/Views/template.mustache").toString();

    var template_config = {
        title: 'Backoffice',
        menu: getMenu()
    };

    var output = mustache.render(template, template_config);
    res.send(output);
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

app.use(express.static(__dirname + '/Public'));

var server = app.listen(8080,function () {
var host = server.address().address === "::" ? "localhost" :
server.address().address
 var port = server.address().port
 console.log("Published Server running on http://%s:%s", host, port)
});