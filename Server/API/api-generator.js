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

    var nmRelations = [];

    schemas.forEach(schema => {
      let _references = schema.references;
      if (Object.keys(_references).length > 0){
        _references.forEach(ref => {
          if (ref.relation == 'M-M')
          nmRelations.push({modelA: schema.name, modelB: ref.model});
        });
      }
    });

    template_config.nmRelations = nmRelations;

  
    var output = mustache.render(template, template_config);
    fs.writeFile("./Publish/Controllers/api.js", output, err => {});
}

module.exports = {generateAPI}