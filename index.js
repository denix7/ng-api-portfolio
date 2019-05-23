'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api-portafolio')
        .then(() => {
            console.log('Conexion a BD exitosa');

            //Creacion del servidor
            app.listen(port, () => {
                console.log("Server running on localhost:3700");
            })
        })
        .catch(err => console.log(err));
