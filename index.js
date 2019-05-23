'use strict'

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api-portafolio')
        .then(() => {
            console.log('Conexion a BD exitosa');
        })
        .catch(err => console.log(err));
