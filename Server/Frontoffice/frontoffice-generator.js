var fs = require('fs');
var mustache = require('mustache');

function generateFrontoffice (schemas){
    var template = fs.readFileSync("./Server/Frontoffice/frontoffice.mustache").toString();

    schemas.forEach(function(model) {
      model.name = model.title.charAt(0).toUpperCase() + model.title.slice(1);
    });
    var template_config = {
      models: schemas
    };
  
    var output = mustache.render(template, template_config);
    fs.writeFile("./Publish/Controllers/frontoffice.js", output, err => {});
}

module.exports = {generateFrontoffice}