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
        console.log(data);
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
    console.log("Getting Details for Movie object with id " + (req.params.id));
    Movie.get(req.params.id, function(data) {
        if (data){
            res.render('details', {
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

router.get("/Movie/Edit/:id", function(req, res) {
    console.log("Getting Edit for Movie object with id " + (req.params.id));
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
    console.log("Getting Insert for Movie object");
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
        console.log(data);
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
    console.log("Getting Details for Category object with id " + (req.params.id));
    Category.get(req.params.id, function(data) {
        if (data){
            res.render('details', {
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

router.get("/Category/Edit/:id", function(req, res) {
    console.log("Getting Edit for Category object with id " + (req.params.id));
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
    console.log("Getting Insert for Category object");
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
        console.log(data);
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
    console.log("Getting Details for Director object with id " + (req.params.id));
    Director.get(req.params.id, function(data) {
        if (data){
            res.render('details', {
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

router.get("/Director/Edit/:id", function(req, res) {
    console.log("Getting Edit for Director object with id " + (req.params.id));
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
    console.log("Getting Insert for Director object");
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
        console.log(data);
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
    console.log("Getting Details for Actor object with id " + (req.params.id));
    Actor.get(req.params.id, function(data) {
        if (data){
            res.render('details', {
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

router.get("/Actor/Edit/:id", function(req, res) {
    console.log("Getting Edit for Actor object with id " + (req.params.id));
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
    console.log("Getting Insert for Actor object");
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