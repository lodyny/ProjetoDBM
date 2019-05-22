var fs = require('fs');
var mustache = require('mustache');

function generateAPI (schemas){
    var template = fs.readFileSync("./Server/API/api.mustache").toString();

    schemas.forEach(function(model) {
      model.name = model.title.charAt(0).toUpperCase() + model.title.slice(1);
    });
    var template_config = {
      models: schemas
    };
  
    var output = mustache.render(template, template_config);
    fs.writeFile("./Publish/Controllers/api.js", output, err => {});
}

module.exports = {generateAPI}