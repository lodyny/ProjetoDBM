var fs = require('fs');
var mustache = require('mustache');

function generateServer(server_port) {
    var path = './Publish/index.js';
    fs.readFile('./Server/server.mustache', function (err, data) {
        var view = {
            port: server_port
        };
        var output = mustache.render(data.toString(), view);
        fs.writeFileSync(path, output)
    });
    return path;
}

module.exports = {
    generateServer
};