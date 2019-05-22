var mustache = require("mustache");
var fs = require("fs");

function generateClasses(schemas, db_name) {
  var template = fs.readFileSync("./Models/Classes/class.mustache").toString();
  schemas.forEach(schema => {
    var props = Object.keys(schema.properties);
    schema.required = schema.required || [];
    var config = {
      db_name: db_name,
      classTitle: schema.title,
      classProperties: props.join(),
      classConstructor: generateConstructor(schema),
      classReferences: function references(){
        return schema.references.map(function(ref){
            return {
              model : ref.model.toLowerCase(),
              isMM: ref.relation == "M-M"
            }
        })
      },
      primaryKey: {
        name: "id",
        columnName: schema.title.toLowerCase() + "_id"
      },

      properties: function() {
        //funÃ§Ã£o para converter as propriedades que sÃ£o objectos para um array de objetos (mais fÃ¡cil para processar)
        return Object.keys(schema.properties).map(key => {
          //converte as propriedades que sÃ£o objectos para um array de objetos (mais fÃ¡cil para processar)
          schema.properties[key].name = key; //acrescento a propriedade name que terÃ¡ o nome da propriedade
          schema.properties[key].required = schema.required.indexOf(key) !== -1; //acrescento a propriedade required que terÃ¡ true ou false caso esteja no array required do schema
          schema.properties[key].columnName = key; //serÃ¡ o nome utilizado para a coluna que terÃ¡ na tabela da base de dados
          return schema.properties[key];
        });
      },
      get propertiesJoin() {
        //criar um array com os nomes das propriedades e fazer o join para separar por ,
        return this.properties()
          .map(obj => {
            return obj.name;
          })
          .join();
      },
      get propertiesJoinThis() {
        //criar um array com os nomes das propriedades (com o this.) e fazer o join para separar por ,
        return this.properties()
          .map(obj => {
            return "this." + obj.name;
          })
          .join();
      },
      get propertiesSetValues() {
        //criar um array com os nomes das propriedades (igualando a um parÃ¢metro) e fazer o join para separar por ,
        return this.properties()
          .map(obj => {
            return obj.name + " = ?";
          })
          .join();
      },
      get propertiesValuesParams() {
        //criar um array com os parÃ¢metros igual ao nÃºmero de propriedades e fazer o join para separar por ,
        return this.properties()
          .map(obj => {
            return "?";
          })
          .join();
      },
      get mappingDBtoObject() {
        //criar um mapeamento entre o nome da propriedade de um objeto e a tabela da base de dados
        var props = this.properties();
        props.push(this.primaryKey);
        return props
          .map(obj => {
            return obj.columnName.toLowerCase() + ":'" + obj.name + "'";
          })
          .join();
      }
    };

    var output = mustache.render(template, config);
    fs.writeFileSync("./Publish/Models/" + config.classTitle + ".js", output);
  });
}

function generateConstructor(schema) {
  var constructor = "";
  var enums = schema.required || [];
  var props = Object.keys(schema.properties);

  props.forEach(key => {
    if (!enums.includes(key)) {
      constructor +=
        '\n\t\tObject.defineProperty(this, "' +
        key +
        '",{\n\t\t\t enumerable: false, writable: true, value: ' +
        key +
        " \n\t\t });";
    } else {
      constructor += "this." + key + "=" + key + ";" + "\n\t\t";
    }
  });

  constructor += generateReferences(schema);

  return constructor;
}

function generateReferences(schema) {
  var references = schema.references;
  var str = "";
  var model = "";
  if (references !== void 0) {
    references.forEach(reference => {
      model = reference.model.toLowerCase();

      switch (reference.relation) {
        case "1-1":
        str +=
        '\n\t\tObject.defineProperty(this, "' +
        model +
        '_id",{\n\t\t\t enumerable: false, writable: true \n\t\t});';
          break;

        case "0-M":
          str +=
            '\n\t\tObject.defineProperty(this, "' +
            model +
            '_id",{\n\t\t\t enumerable: false, writable: true \n\t\t });';
          break;

        case "1-M":
          str +=
            '\n\t\tObject.defineProperty(this, "' +
            model +
            '_id",{\n\t\t\t enumerable: false, writable: true \n\t\t });';
          break;

        case "M-M":
          str +=
            '\n\t\tObject.defineProperty(this, "' +
            model +
            '_ids",{\n\t\t\t enumerable: false, writable: true \n\t\t, value:[] });';
          break;
      }
    });
  }
  return str;
}

module.exports = {generateClasses};
