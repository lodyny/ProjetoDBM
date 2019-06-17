var sqlite3 = require("sqlite3").verbose();
var fs = require("fs");
var mustache = require("mustache");

var db;
var mmrelations = [];

function generateDatabase(schemas, db_name, dummyData) {
  db = new sqlite3.Database("./Publish/Database/" + db_name);

  schemas.forEach(schema => {
    createTable(schema);
  });

  setTimeout(function () {
    schemas.forEach(schema => {
      generateRelationships(schema);
    });
  }, 2500);

  setTimeout(function () {
    if(dummyData)
      createDummyData();
  }, 3000);

  setTimeout(function () {
    db.close();
  }, 4000);
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

function generateRelationships(schema) {
  var references = schema.references;
  var config_json = JSON.parse(fs.readFileSync("./Server/config.json"));

  var query_template;
  if (references !== void 0) {
    references.forEach(reference => {
      var config = {
        child_table: schema.title,
        parent_table: reference.model,
        child_collumn: schema.title.toLowerCase(),
        parent_collumn: reference.model.toLowerCase()
      };
      switch (reference.relation) {
        case "1-1":
          query_template = fs.readFileSync("./Models/Database/fk_11.mustache").toString();
          db.run(mustache.render(query_template, config));
          setTimeout(function () {
            query_template = fs.readFileSync("./Models/Database/fk_11_index.mustache").toString();
            db.run(mustache.render(query_template, config));
          }, 1000);
          break;
        case "1-M":
          query_template = fs.readFileSync("./Models/Database/fk_1M.mustache").toString();
          db.run(mustache.render(query_template, config));
          break;
        case "M-M":
          if (
            mmrelations.indexOf(
              config.child_table + "_" + config.parent_table
            ) == -1 &&
            mmrelations.indexOf(
              config.parent_table + "_" + config.child_table
            ) == -1
          ) {
            if (config_json.databases === void 0)
              config_json.databases = [];

            var exists = false;

            config_json.databases.some(table => {
              if (table.tableName.toLowerCase() == config.child_table.toLowerCase() + "_" + config.parent_table.toLowerCase() ||
                table.tableName.toLowerCase() == config.parent_table.toLowerCase() + "_" + config.child_table.toLowerCase())
                exists = true;

              return exists == true;
            });

            if (!exists) {
              config_json.databases.push({
                tableName: config.child_table + "_" + config.parent_table
              });

              fs.writeFileSync("./Server/config.json", JSON.stringify(config_json));
            }

            query_template = fs
              .readFileSync("./Models/Database/fk_MM.mustache")
              .toString();
            db.run(mustache.render(query_template, config));
            mmrelations.push(config.child_table + "_" + config.parent_table);
          }
          break;
      }
    });
  }
}

function createDummyData(){
  console.log("Generating dummy data...");
  db.exec("INSERT INTO Actor (name, birthyear) VALUES ('TomasEdi', 1999),('KongoPongo',1980),('Olaf',2001)");
  db.exec("INSERT INTO Category (name) VALUES ('Horror'),('Comedy'),('Action'),('Drama'),('Fantasy')");
  db.exec("INSERT INTO Director (name, birthyear) VALUES ('Agustini', 1980),('Pirinpini', 1990),('Secolini', 2000)");
  db.exec("INSERT INTO Movie (name, year, category_id, director_id) VALUES ('Titanic', 1994, 1, 1),('The lord of the Rings', 2000, 2, 2),('The Matrix', 1900, 3, 3),('The Godfather', 2002, 4, 1),('Star Wars: Episode IV', 1994, 5, 2)");
  db.exec("INSERT INTO Actor_Movie (actor_id,movie_id) VALUES (1,1),(1,2),(1,3),(3,3),(3,4)");
}

module.exports.generateDatabase = generateDatabase;