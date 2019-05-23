'use strict'

var express = require('express');
//var body-parser = require('body-parser');
var app = express();

//Cargar rutas


//Cargar middlewares


//Cargar CORS y Headers


//Rutas
app.get('/test', (req, res) => {
    res.status(200).send({message: 'Server it works'});
});

module.exports = app;
