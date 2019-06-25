var express = require('express');
var router = express.Router();
var mustache = require("mustache");
var fs = require("fs");

var Movie = require('../Models/Movie.js');
var Category = require('../Models/Category.js');
var Director = require('../Models/Director.js');
var Actor = require('../Models/Actor.js');

router.get("/Movie", function(req, res) {
    Movie.all(function (data) {
        res.render('list', {
            title: 'Movie',
            columns: Object.keys(new Movie()),
            rows: data.map(obj => {
                return {
                    properties: Object.keys(obj).map(key => {
                        return {
                            name: key,
                            value: obj[key]
                        }
                    }),
                    actions: [{
                        label: '',
                        link: './Movie/Details/' + obj.id,
                        image: {
                            src: '../images/read.png'
                        },
                        tooltip: 'Details'
                    }, {
                        label: '',
                        link: './Movie/Edit/' + obj.id,
                        image: {
                            src: '../images/edit.png'
                        },
                        tooltip: 'Edit'
                    }, {
                        label: '',
                        link: '#',
                        image: {
                            src: '../images/delete.png'
                        },
                        tooltip: 'Delete',
                        events: [{
                            name: "onclick",
                            function: "delete",
                            args: obj.id
                        }]

                    }]
                }
            })
        })
    });
});

router.get("/Movie/Details/:id", function(req, res) {
    Movie.get(req.params.id, function (row) {
        var model = JSON.parse(fs.readFileSync("./Models/Schemas/" + "Movie".toLowerCase()
                + "-schema.json"));
        res.render('details', {
            properties: function () {
                var allProps = Object.getOwnPropertyNames(row);
                var validProps = [];
                allProps.forEach(function (prop) {
                    if (model.properties.hasOwnProperty(prop)) {
                        console.log(prop + " -> " + model.properties[prop].presentationMode);
                        validProps.push({
                            name: prop,
                            mode: model.properties[prop].presentationMode,
                            value: row[prop]
                        });
                    }
                });
                return validProps;
            },
            references: function () {
                var allRefs = [];
                if (model.references){
                    model.references.forEach(function (ref) {
                        allRefs.push({
                            label: ref.label,
                            model: ref.model,
                            values: ref.relation == "M-M" ? req.params.id + '/' + ref.model : row[(ref.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        })
    });
});



router.get("/Movie/Edit/:id", function(req, res) {
    Movie.get(req.params.id, function(data) {
        if (data){
            res.render('form', {
                title: 'Details',
                properties: function (){
                    return Object.keys(data).map(key => {
                        var proprow = {};

                        proprow.name = key;
                        proprow.value = data[key];
                        
                        return proprow;
                    })
                }
            })
        }
    })
});

router.get("/Movie/Insert", function(req, res) {
            res.render('form', {
                title: 'Details',
                properties: function (){
                    return Object.keys(new Movie()).map(key => {
                        var proprow = {};

                        proprow.name = key;
                        
                        return proprow;
                    })
                }
            })
});

router.get("/Category", function(req, res) {
    Category.all(function (data) {
        res.render('list', {
            title: 'Category',
            columns: Object.keys(new Category()),
            rows: data.map(obj => {
                return {
                    properties: Object.keys(obj).map(key => {
                        return {
                            name: key,
                            value: obj[key]
                        }
                    }),
                    actions: [{
                        label: '',
                        link: './Category/Details/' + obj.id,
                        image: {
                            src: '../images/read.png'
                        },
                        tooltip: 'Details'
                    }, {
                        label: '',
                        link: './Category/Edit/' + obj.id,
                        image: {
                            src: '../images/edit.png'
                        },
                        tooltip: 'Edit'
                    }, {
                        label: '',
                        link: '#',
                        image: {
                            src: '../images/delete.png'
                        },
                        tooltip: 'Delete',
                        events: [{
                            name: "onclick",
                            function: "delete",
                            args: obj.id
                        }]

                    }]
                }
            })
        })
    });
});

router.get("/Category/Details/:id", function(req, res) {
    Category.get(req.params.id, function (row) {
        var model = JSON.parse(fs.readFileSync("./Models/Schemas/" + "Category".toLowerCase()
                + "-schema.json"));
        res.render('details', {
            properties: function () {
                var allProps = Object.getOwnPropertyNames(row);
                var validProps = [];
                allProps.forEach(function (prop) {
                    if (model.properties.hasOwnProperty(prop)) {
                        console.log(prop + " -> " + model.properties[prop].presentationMode);
                        validProps.push({
                            name: prop,
                            mode: model.properties[prop].presentationMode,
                            value: row[prop]
                        });
                    }
                });
                return validProps;
            },
            references: function () {
                var allRefs = [];
                if (model.references){
                    model.references.forEach(function (ref) {
                        allRefs.push({
                            label: ref.label,
                            model: ref.model,
                            values: ref.relation == "M-M" ? req.params.id + '/' + ref.model : row[(ref.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        })
    });
});



router.get("/Category/Edit/:id", function(req, res) {
    Category.get(req.params.id, function(data) {
        if (data){
            res.render('form', {
                title: 'Details',
                properties: function (){
                    return Object.keys(data).map(key => {
                        var proprow = {};

                        proprow.name = key;
                        proprow.value = data[key];
                        
                        return proprow;
                    })
                }
            })
        }
    })
});

router.get("/Category/Insert", function(req, res) {
            res.render('form', {
                title: 'Details',
                properties: function (){
                    return Object.keys(new Category()).map(key => {
                        var proprow = {};

                        proprow.name = key;
                        
                        return proprow;
                    })
                }
            })
});

router.get("/Director", function(req, res) {
    Director.all(function (data) {
        res.render('list', {
            title: 'Director',
            columns: Object.keys(new Director()),
            rows: data.map(obj => {
                return {
                    properties: Object.keys(obj).map(key => {
                        return {
                            name: key,
                            value: obj[key]
                        }
                    }),
                    actions: [{
                        label: '',
                        link: './Director/Details/' + obj.id,
                        image: {
                            src: '../images/read.png'
                        },
                        tooltip: 'Details'
                    }, {
                        label: '',
                        link: './Director/Edit/' + obj.id,
                        image: {
                            src: '../images/edit.png'
                        },
                        tooltip: 'Edit'
                    }, {
                        label: '',
                        link: '#',
                        image: {
                            src: '../images/delete.png'
                        },
                        tooltip: 'Delete',
                        events: [{
                            name: "onclick",
                            function: "delete",
                            args: obj.id
                        }]

                    }]
                }
            })
        })
    });
});

router.get("/Director/Details/:id", function(req, res) {
    Director.get(req.params.id, function (row) {
        var model = JSON.parse(fs.readFileSync("./Models/Schemas/" + "Director".toLowerCase()
                + "-schema.json"));
        res.render('details', {
            properties: function () {
                var allProps = Object.getOwnPropertyNames(row);
                var validProps = [];
                allProps.forEach(function (prop) {
                    if (model.properties.hasOwnProperty(prop)) {
                        console.log(prop + " -> " + model.properties[prop].presentationMode);
                        validProps.push({
                            name: prop,
                            mode: model.properties[prop].presentationMode,
                            value: row[prop]
                        });
                    }
                });
                return validProps;
            },
            references: function () {
                var allRefs = [];
                if (model.references){
                    model.references.forEach(function (ref) {
                        allRefs.push({
                            label: ref.label,
                            model: ref.model,
                            values: ref.relation == "M-M" ? req.params.id + '/' + ref.model : row[(ref.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        })
    });
});



router.get("/Director/Edit/:id", function(req, res) {
    Director.get(req.params.id, function(data) {
        if (data){
            res.render('form', {
                title: 'Details',
                properties: function (){
                    return Object.keys(data).map(key => {
                        var proprow = {};

                        proprow.name = key;
                        proprow.value = data[key];
                        
                        return proprow;
                    })
                }
            })
        }
    })
});

router.get("/Director/Insert", function(req, res) {
            res.render('form', {
                title: 'Details',
                properties: function (){
                    return Object.keys(new Director()).map(key => {
                        var proprow = {};

                        proprow.name = key;
                        
                        return proprow;
                    })
                }
            })
});

router.get("/Actor", function(req, res) {
    Actor.all(function (data) {
        res.render('list', {
            title: 'Actor',
            columns: Object.keys(new Actor()),
            rows: data.map(obj => {
                return {
                    properties: Object.keys(obj).map(key => {
                        return {
                            name: key,
                            value: obj[key]
                        }
                    }),
                    actions: [{
                        label: '',
                        link: './Actor/Details/' + obj.id,
                        image: {
                            src: '../images/read.png'
                        },
                        tooltip: 'Details'
                    }, {
                        label: '',
                        link: './Actor/Edit/' + obj.id,
                        image: {
                            src: '../images/edit.png'
                        },
                        tooltip: 'Edit'
                    }, {
                        label: '',
                        link: '#',
                        image: {
                            src: '../images/delete.png'
                        },
                        tooltip: 'Delete',
                        events: [{
                            name: "onclick",
                            function: "delete",
                            args: obj.id
                        }]

                    }]
                }
            })
        })
    });
});

router.get("/Actor/Details/:id", function(req, res) {
    Actor.get(req.params.id, function (row) {
        var model = JSON.parse(fs.readFileSync("./Models/Schemas/" + "Actor".toLowerCase()
                + "-schema.json"));
        res.render('details', {
            properties: function () {
                var allProps = Object.getOwnPropertyNames(row);
                var validProps = [];
                allProps.forEach(function (prop) {
                    if (model.properties.hasOwnProperty(prop)) {
                        console.log(prop + " -> " + model.properties[prop].presentationMode);
                        validProps.push({
                            name: prop,
                            mode: model.properties[prop].presentationMode,
                            value: row[prop]
                        });
                    }
                });
                return validProps;
            },
            references: function () {
                var allRefs = [];
                if (model.references){
                    model.references.forEach(function (ref) {
                        allRefs.push({
                            label: ref.label,
                            model: ref.model,
                            values: ref.relation == "M-M" ? req.params.id + '/' + ref.model : row[(ref.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allRefs;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        })
    });
});



router.get("/Actor/Edit/:id", function(req, res) {
    Actor.get(req.params.id, function(data) {
        if (data){
            res.render('form', {
                title: 'Details',
                properties: function (){
                    return Object.keys(data).map(key => {
                        var proprow = {};

                        proprow.name = key;
                        proprow.value = data[key];
                        
                        return proprow;
                    })
                }
            })
        }
    })
});

router.get("/Actor/Insert", function(req, res) {
            res.render('form', {
                title: 'Details',
                properties: function (){
                    return Object.keys(new Actor()).map(key => {
                        var proprow = {};

                        proprow.name = key;
                        
                        return proprow;
                    })
                }
            })
});


module.exports = router;