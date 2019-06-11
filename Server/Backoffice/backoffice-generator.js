var fs = require('fs');
var mustache = require('mustache');

function generateBackoffice (schemas){
    var template = fs.readFileSync("./Server/Backoffice/backoffice.mustache").toString();

    schemas.forEach(function(model) {
      model.name = model.title.charAt(0).toUpperCase() + model.title.slice(1);
    });
    var template_config = {
      models: schemas
    };
  
    var output = mustache.render(template, template_config);
    fs.writeFile("./Publish/Controllers/backoffice.js", output, err => {});
}

module.exports = {generateBackoffice}