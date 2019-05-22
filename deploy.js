var mkdirp = require('mkdirp');
var del = require('del');

function generateFolders(){
    del.sync('./Publish');
    mkdirp.sync('./Publish/Controllers');
    mkdirp.sync('./Publish/Database');
    mkdirp.sync('./Publish/Models');
    mkdirp.sync('./Publish/Views');
    mkdirp.sync('./Publish/Public');
    mkdirp.sync('./Publish/Public/Css');
    mkdirp.sync('./Publish/Public/Js');
    mkdirp.sync('./Publish/Public/Images');
}

function createPath(path){
    mkdirp.sync(path.slice(0, -1));
}

module.exports = {generateFolders, createPath}