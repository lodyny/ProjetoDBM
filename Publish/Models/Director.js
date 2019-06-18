const dbpath = "./Publish/Database/movies.db";
var database = require('../Database/sqlitedbm.js')(dbpath);

class Director {
    constructor (name,birthyear) {
        Object.defineProperty(this,'id',{ 
                enumerable:true,
                writable:true,        
            });
        this.name=name;
		this.birthyear=birthyear;
		
    }
}
 
Director.all = function (callback) {
    database.where("SELECT * FROM Director", [], Director, callback);
}       

Director.get = function (id, callback) {
    database.get("SELECT * FROM Director WHERE director_id = ? ",[id] ,Director, callback);
}

Director.delete = function (id, callback) {
    database.get("DELETE FROM Director WHERE director_id = ? ",[id] ,Director, callback);
}

Director.prototype.save = function (callback) {
    if(this.id) {//UPDATE
        database.run("UPDATE Director SET name = ?,birthyear = ? WHERE director_id = ?", 
        [this.name,this.birthyear
            
            ,this.id
        ]       
        , callback);
    
    } else {//INSERT      
        database.run("INSERT INTO Director(name,birthyear ) VALUES(?,?)" ,
         [this.name,this.birthyear
            
         ], callback);     
    }
}

Director.many = function (model, id, callback){
    var tableName = "Director_" + model;
    
    database.where(`SELECT Director.* FROM Director INNER JOIN ${tableName} ON ${tableName}.id = Director.id WHERE ${tableName}.${model.toLowerCase()}_id = ?`, [id], Director, callback);
}

Director.mappingDBtoObject = {
    name:'name',birthyear:'birthyear',director_id:'id'
}

module.exports = Director;