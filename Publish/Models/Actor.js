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
		
		Object.defineProperty(this, "movie_ids",{
			 enumerable: false, writable: true 
		, value:[] });
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

Actor.many = function (model, id, callback){
    var tableName = "Actor_" + model;
    
    database.where(`SELECT Actor.* FROM Actor INNER JOIN ${tableName} ON ${tableName}.Actor_id = Actor.Actor_id WHERE ${tableName}.${model.toLowerCase()}_id = ?`, [id], Actor, callback);
}

Actor.top = function (property,order,limit,callback) {
    var dbprop = Object.keys(Actor.mappingDBtoObject).find(key => Actor.mappingDBtoObject[key] == property);
    database.where(`SELECT * FROM Actor ORDER BY ${dbprop} ${order} LIMIT ?`, [limit], Actor, callback);
}

Actor.topWith1M = function(model, order, limit,callback){
    var attributeModel = model.toLowerCase();
    database.where(`select a.*,b.* from Actor a, ${model} b where a.${attributeModel}_id = b.${attributeModel}_id ORDER by a.${order} LIMIT ?`, [limit], Actor, callback);
}

Actor.topWithMMCount = function (model, order,limit,callback) {
    var nmTableName = database.getNMTableName("Actor", model);
    database.where(`select a.*, count(b.Actor_id) as count from Actor a, ${nmTableName} b where a.Actor_id = b.Actor_id group by a.Actor_id order by count ${order} LIMIT ?`, [limit], Actor, callback);
}

Actor.mappingDBtoObject = {
    name:'name',birthyear:'birthyear',actor_id:'id'
        , movie_id : 'movie_id'
}

module.exports = Actor;