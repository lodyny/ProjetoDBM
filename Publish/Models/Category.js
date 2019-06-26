const dbpath = "./Publish/Database/movies.db";
var database = require('../Database/sqlitedbm.js')(dbpath);

class Category {
    constructor (name) {
        Object.defineProperty(this,'id',{ 
                enumerable:true,
                writable:true,        
            });
        this.name=name;
		
    }
}
 
Category.all = function (callback) {
    database.where("SELECT * FROM Category", [], Category, callback);
}       

Category.get = function (id, callback) {
    database.get("SELECT * FROM Category WHERE category_id = ? ",[id] ,Category, callback);
}

Category.delete = function (id, callback) {
    database.get("DELETE FROM Category WHERE category_id = ? ",[id] ,Category, callback);
}

Category.prototype.save = function (callback) {
    if(this.id) {//UPDATE
        database.run("UPDATE Category SET name = ? WHERE category_id = ?", 
        [this.name
            
            ,this.id
        ]       
        , callback);
    
    } else {//INSERT      
        database.run("INSERT INTO Category(name ) VALUES(?)" ,
         [this.name
            
         ], callback);     
    }
}

Category.many = function (model, id, callback){
    var tableName = "Category_" + model;
    
    database.where(`SELECT Category.* FROM Category INNER JOIN ${tableName} ON ${tableName}.Category_id = Category.Category_id WHERE ${tableName}.${model.toLowerCase()}_id = ?`, [id], Category, callback);
}

Category.top = function (property,order,limit,callback) {
    var dbprop = Object.keys(Category.mappingDBtoObject).find(key => Category.mappingDBtoObject[key] == property);
    database.where(`SELECT * FROM Category ORDER BY ${dbprop} ${order} LIMIT ?`, [limit], Category, callback);
}

Category.topWith1M = function(model, order, limit,callback){
    var attributeModel = model.toLowerCase();
    database.where(`select a.*,b.* from Category a, ${model} b where a.${attributeModel}_id = b.${attributeModel}_id ORDER by a.${order} LIMIT ?`, [limit], Category, callback);
}

Category.topWithMMCount = function (model, order,limit,callback) {
    var nmTableName = database.getNMTableName("Category", model);
    database.where(`select a.*, count(b.Category_id) as count from Category a, ${nmTableName} b where a.Category_id = b.Category_id group by a.Category_id order by count ${order} LIMIT ?`, [limit], Category, callback);
}

Category.mappingDBtoObject = {
    name:'name',category_id:'id'
}

module.exports = Category;