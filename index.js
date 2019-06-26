var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var childProcess = require('child_process');
var app = express();
var nodemon = require('nodemon');
var mustache = require('mustache');

// Generators 
var deployGenerator = require('./deploy');
var classGenerator = require('./Models/Classes/class-generator');
var dbGenerator = require('./Models/Database/database-generator');
var serverGenerator = require('./Server/server-generator');
var apiGenerator = require('./Server/API/api-generator');
var backofficeGenerator = require('./Server/Backoffice/backoffice-generator');
var frontofficeGenerator = require('./Server/Frontoffice/frontoffice-generator');
// End Generators

// Variables
var deployedServer;
var schemas = [];
var dbname = '';
var port;
var staticFiles = [];
//

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static('Public'));

function readConfigs() {
    var config = JSON.parse(fs.readFileSync("./Server/config.json"));
    if (config == null)
        return false;

    dbname = config.dbname;
    schemas = [];
    config.schemas.forEach(model => {
        schemas.push(JSON.parse(fs.readFileSync(model.path)));
    });
    port = config.port;

    config.staticFiles.forEach(file => {
        staticFiles.push(file);
    });

    return true;
}

function generate() {
    if (!readConfigs())
        return;

    deployGenerator.generateFolders();
    moveStaticFiles();

    classGenerator.generateClasses(schemas, dbname);
    dbGenerator.generateDatabase(schemas, dbname, true);
    apiGenerator.generateAPI(schemas);
    backofficeGenerator.generateBackoffice(schemas);
    frontofficeGenerator.generateFrontoffice(schemas);
    deployedServer = serverGenerator.generateServer(port);
    //runDeployedServer(deployedServer);
};

var teste;
function startPublish(){
    teste = nodemon({ script: './Publish/index.js' }).on('start', function(){
        console.log('nodemon started');
    }).on('crash', function () {
        console.log('script crashed...');
    });
    console.log(teste);
}

app.post("/generate", function (req, res) {
    console.log("Generating...");
    generate();
    console.log("Server deployment started...");
    res.redirect('/');
});

app.post("/start", function (req, res) {
    console.log("Server Start...");
    //runDeployedServer(deployedServer);
    startPublish();
    res.redirect('/');
});

app.post("/stop", function (req, res) {
    console.log("Server Stop...");
    nodemon.emit('quit');
    res.redirect('/');
});

app.post("/getStats", function (req, res){
    console.log("IsRunning: " + isServerRunning());
});

app.get("/getStatus", function (req, res){
    res.send(isServerRunning());
});

app.get("/models", function (req, res){
    var config = fs.readFileSync("./Server/config.json");
    config = JSON.parse(config);

    var files_list = [];
    var aux_file;

    config.schemas.forEach(function(model) {
        aux_file = fs.readFileSync(model.path);
        files_list.push(JSON.parse(aux_file));
    });

    res.send(files_list);
});

app.get("/model/:name", function (req, res){
    var config = fs.readFileSync("./Server/config.json");
    config = JSON.parse(config);
    var aux_file = null;
    config.schemas.some(function(model){
        if (model.name.toLowerCase() == req.params.name.toLowerCase())
            aux_file = fs.readFileSync(model.path);

        return aux_file != null;
    });

    var parsed = JSON.parse(aux_file);
    res.send(parsed);
});

app.post("/generateModel", function (req, res){
    fs.writeFileSync("./Models/Schemas/" + req.body.title + "-schema.json", JSON.stringify(req.body));
    var config_json = fs.readFileSync("./Server/config.json");
    
    config_json = JSON.parse(config_json);
    
    var model = {
        name: req.body.title,
        path: "./Models/Schemas/" + req.body.title + "-schema.json"
      };
    
    if (!modelCreated(model, config_json.schemas))
        config_json.schemas.push(model);
    
    fs.writeFileSync("./Server/config.json", JSON.stringify(config_json));
    
    res.sendStatus(200);
});

function modelCreated(model, models) {
    console.log()
    var i;
    for (i = 0; i < models.length; i++) {
      if (models[i].name === model.name) {
        return true;
      }
    }
  
    return false;
  }

function isServerRunning(){
    if (teste == null)
        return false;
    return teste.config.run;
}

var server = app.listen(8000, function () {
    var host = server.address().address === "::" ? "localhost" : server.address().address;
    var port = server.address().port;
    console.log("Server running at http://%s:%s", host, port);
});

function moveStaticFiles() {
    staticFiles.forEach(file => {
        deployGenerator.createPath(file.destinationPath);
        var data = fs.readFileSync(file.originalPath + file.fileName);
        fs.writeFileSync(file.destinationPath + file.fileName, data);
    });
}