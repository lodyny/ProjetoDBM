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

Category.mappingDBtoObject = {
    name:'name',category_id:'id'
}

module.exports = Category;