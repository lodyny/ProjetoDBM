var sqlite3 = require("sqlite3").verbose();
var fs = require("fs");
var mustache = require("mustache");

var db;

function generateDatabase(schemas, db_name) {
    db = new sqlite3.Database("./Publish/Database/" + db_name);
    
    schemas.forEach(schema => {
        createTable(schema);
      });

    db.close();
}

function createTable(schema) {
    var props = schema.properties;
    var keys = Object.keys(props);
    var str_collumns_boy = "";
  
    var query_template = fs
      .readFileSync("./Models/Database/create-table.mustache")
      .toString();
  
    keys.forEach(key => {
      str_collumns_boy += createCollumn(schema, key);
    });
  
    str_collumns_boy = str_collumns_boy.slice(0, -1);
  
    var config = {
      table_name: schema.title,
      primary_key: schema.title.toLowerCase() + "_id",
      collumns_body: str_collumns_boy
    };
    console.log(mustache.render(query_template, config));
    db.run(mustache.render(query_template, config));
  }
  
  function createCollumn(schema, key) {
    var props = schema.properties;
    var collumn = props[key];
    var required = schema.required || [];
    var str_collumn_body = "";
  
    str_collumn_body += key.toLowerCase() + " " + collumn.type;
  
    if (required.includes(key)) str_collumn_body += " NOT NULL ";
  
    if (collumn.unique) str_collumn_body += " UNIQUE ";
  
    if (collumn.minimum !== void 0 && collumn.maximum !== void 0) {
      str_collumn_body +=
        " check(" +
        key +
        ">=" +
        collumn.minimum +
        " and " +
        key +
        "<=" +
        collumn.maximum +
        ")";
    } else {
      if (collumn.minimum !== void 0)
        str_collumn_body += " check(" + key + ">=" + collumn.minimum + ")";
  
      if (collumn.maximum !== void 0)
        str_collumn_body += " check(" + key + "<=" + collumn.maximum + ")";
    }
    str_collumn_body += ",";
    return str_collumn_body;
  }

module.exports.generateDatabase = generateDatabase;