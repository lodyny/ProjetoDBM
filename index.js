var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var childProcess = require('child_process');
var app = express();

// Generators 
var deployGenerator = require('./deploy');
var classGenerator = require('./Models/Classes/class-generator');
var dbGenerator = require('./Models/Database/database-generator');
var serverGenerator = require('./Server/server-generator');
var apiGenerator = require('./Server/API/api-generator');
// End Generators

// Variables
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

app.get('/Hello', function (req, res) {
    res.send("Hello");
});

function readConfigs() {
    var config = JSON.parse(fs.readFileSync("./Server/config.json"));
    if (config == null)
        return false;

    dbname = config.dbname;
    config.schemas.forEach(model => {
        schemas.push(JSON.parse(fs.readFileSync(model.path)));
    });
    port = config.port;

    config.staticFiles.forEach(file => {
        staticFiles.push(file);
    });

    return true;
}

function generate( /*req, res*/ ) {
    if (!readConfigs())
        return;

    deployGenerator.generateFolders();
    moveStaticFiles();

    classGenerator.generateClasses(schemas, dbname);
    dbGenerator.generateDatabase(schemas, dbname);
    apiGenerator.generateAPI(schemas);
    var deployedServer = serverGenerator.generateServer(port);
    runDeployedServer(deployedServer);
    //res.send("Server deployment successful.");
};

function runDeployedServer(deployedServer) {
    childProcess.fork(deployedServer);
}

var server = app.listen(8000, function () {
    var host = server.address().address === "::" ? "localhost" : server.address().address;
    var port = server.address().port;
    console.log("Server running at http://%s:%s", host, port);
});

var fs = require('fs');
var mustache = require('mustache');

function moveStaticFiles() {
    staticFiles.forEach(file => {
        deployGenerator.createPath(file.destinationPath);
        var data = fs.readFileSync(file.originalPath + file.fileName);
        fs.writeFileSync(file.destinationPath + file.fileName, data);
    });
}

// Forçar generate para não estar sempre a entrar na página backoffice
//generate();

// Rodar apenas o published
runDeployedServer("./Publish/index.js");