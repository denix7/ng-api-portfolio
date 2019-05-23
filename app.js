'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//Cargar rutas
var project_routes = require('./routes/project');

//Cargar middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Cargar CORS y Headers


//Rutas
app.get('/test', (req, res) => {
    res.status(200).send({message: 'Server it works'});
});

app.use('/api', project_routes);

module.exports = app;
