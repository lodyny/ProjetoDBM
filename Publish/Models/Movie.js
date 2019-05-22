const dbpath = "./Publish/Database/movies.db";
var database = require('../Database/sqlitedbm.js')(dbpath);

class Movie {
    constructor (name,year) {
        Object.defineProperty(this,'id',{ 
                enumerable:true,
                writable:true,        
            });
        this.name=name;
		this.year=year;
		
    }
}
 
Movie.all = function (callback) {
    database.where("SELECT * FROM Movie", [], Movie, callback);
}       

Movie.get = function (id, callback) {
    database.get("SELECT * FROM Movie WHERE movie_id = ? ",[id] ,Movie, callback);
}

Movie.delete = function (id, callback) {
    database.get("DELETE FROM Movie WHERE movie_id = ? ",[id] ,Movie, callback);
}

Movie.prototype.save = function (callback) {
    if(this.id) {//UPDATE
        database.run("UPDATE Movie SET name = ?,year = ? WHERE movie_id = ?", 
        [this.name,this.year
            
            ,this.id
        ]       
        , callback);
    
    } else {//INSERT      
        database.run("INSERT INTO Movie(name,year ) VALUES(?,?)" ,
         [this.name,this.year
            
         ]);      
    }
}

Movie.mappingDBtoObject = {
    name:'name',year:'year',movie_id:'id'
}

module.exports = Movie;