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


module.exports = router;