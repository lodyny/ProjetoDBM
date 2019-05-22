const dbpath = "./Publish/Database/movies.db";
var database = require('../Database/sqlitedbm.js')(dbpath);

class Actor {
    constructor (name,birthyear) {
        Object.defineProperty(this,'id',{ 
                enumerable:true,
                writable:true,        
            });
        this.name=name;
		this.birthyear=birthyear;
		
    }
}
 
Actor.all = function (callback) {
    database.where("SELECT * FROM Actor", [], Actor, callback);
}       

Actor.get = function (id, callback) {
    database.get("SELECT * FROM Actor WHERE actor_id = ? ",[id] ,Actor, callback);
}

Actor.delete = function (id, callback) {
    database.get("DELETE FROM Actor WHERE actor_id = ? ",[id] ,Actor, callback);
}

Actor.prototype.save = function (callback) {
    if(this.id) {//UPDATE
        database.run("UPDATE Actor SET name = ?,birthyear = ? WHERE actor_id = ?", 
        [this.name,this.birthyear
            
            ,this.id
        ]       
        , callback);
    
    } else {//INSERT      
        database.run("INSERT INTO Actor(name,birthyear ) VALUES(?,?)" ,
         [this.name,this.birthyear
            
         ], callback);     
    }
}

Actor.mappingDBtoObject = {
    name:'name',birthyear:'birthyear',actor_id:'id'
}

module.exports = Actor;