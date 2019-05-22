var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const api = require('./Controllers/api.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', api);

var server = app.listen(8080,function () {
var host = server.address().address === "::" ? "localhost" :
server.address().address
 var port = server.address().port
 console.log("Published Server running on http://%s:%s", host, port)
});