var express = require("express");
var mustacheExpress = require('mustache-express');
var app = express();
const bodyParser = require("body-parser");
const api = require('./Controllers/api.js');
const backOffice = require('./Controllers/backoffice.js');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/Views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', api);
app.use('/backoffice', backOffice);

app.get('/', function(req, res){
    res.send('API up and running');
});

app.use(express.static(__dirname + '/Public'));

var server = app.listen(8080,function () {
var host = server.address().address === "::" ? "localhost" :
server.address().address
 var port = server.address().port
 console.log("Published Server running on http://%s:%s", host, port)
});