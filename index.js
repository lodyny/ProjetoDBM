var express = require('express');
var bodyParser = require("body-parser");
var deploy = require('./deploy');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('Public'));

app.get('/Hello', function (req, res) {
    res.send("Hello");
});

app.get('/Generate', function (req, res){
    deploy.generateFolders();
    res.send("Server deployment successful.");
});

var server = app.listen(8000, function () {
    var host = server.address().address === "::" ? "localhost" : server.address().address;
    var port = server.address().port;
    console.log("Server running at http://%s:%s", host, port);
});