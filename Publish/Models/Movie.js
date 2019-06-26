const dbpath = "./Publish/Database/movies.db";
var database = require('../Database/sqlitedbm.js')(dbpath);

class Movie {
    constructor (name,year,cover,trailer) {
        Object.defineProperty(this,'id',{ 
                enumerable:true,
                writable:true,        
            });
        this.name=name;
		this.year=year;
		this.cover=cover;
		this.trailer=trailer;
		
		Object.defineProperty(this, "category_id",{
			 enumerable: false, writable: true 
		 });
		Object.defineProperty(this, "director_id",{
			 enumerable: false, writable: true 
		 });
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
        database.run("UPDATE Movie SET name = ?,year = ?,cover = ?,trailer = ?,category_id = ?,director_id = ? WHERE movie_id = ?", 
        [this.name,this.year,this.cover,this.trailer
            ,this.category_id,this.director_id
            ,this.id
        ]       
        , callback);
    
    } else {//INSERT      
        database.run("INSERT INTO Movie(name,year,cover,trailer ,category_id,director_id) VALUES(?,?,?,?, ?, ?)" ,
         [this.name,this.year,this.cover,this.trailer
                ,this.category_id
                ,this.director_id
            
         ], callback);     
    }
}

Movie.many = function (model, id, callback){
    var tableName = "Movie_" + model;
    
    database.where(`SELECT Movie.* FROM Movie INNER JOIN ${tableName} ON ${tableName}.Movie_id = Movie.Movie_id WHERE ${tableName}.${model.toLowerCase()}_id = ?`, [id], Movie, callback);
}

Movie.top = function (property,order,limit,callback) {
    var dbprop = Object.keys(Movie.mappingDBtoObject).find(key => Movie.mappingDBtoObject[key] == property);
    database.where(`SELECT * FROM Movie ORDER BY ${dbprop} ${order} LIMIT ?`, [limit], Movie, callback);
}

Movie.topWith1M = function(model, order, limit,callback){
    var attributeModel = model.toLowerCase();
    database.where(`select a.*,b.* from Movie a, ${model} b where a.${attributeModel}_id = b.${attributeModel}_id ORDER by a.${order} LIMIT ?`, [limit], Movie, callback);
}

Movie.topWithMMCount = function (model, order,limit,callback) {
    var nmTableName = database.getNMTableName("Movie", model);
    database.where(`select a.*, count(b.Movie_id) as count from Movie a, ${nmTableName} b where a.Movie_id = b.Movie_id group by a.Movie_id order by count ${order} LIMIT ?`, [limit], Movie, callback);
}

Movie.mappingDBtoObject = {
    name:'name',year:'year',cover:'cover',trailer:'trailer',movie_id:'id'
        , category_id : 'category_id'
        , director_id : 'director_id'
}

module.exports = Movie;