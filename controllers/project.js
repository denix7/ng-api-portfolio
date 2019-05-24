'use strict'

var Project = require('../models/project');

var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: 'Home its works'
        });
    },

    test: function(req, res){
        return res.status(200).send({
            message: 'Method test its works'
        })
    },

    saveProject: function(req, res){
        var project = new Project();

        var params = req.body;
        
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save((err, projectStored) => {
            if(err){
                res.status(500).send({message: 'Error al guardar los datos'});
            }
            else if(!projectStored){
                res.status(404).send({message: 'No se ha guardado el proyecto'});
            }
            else{
                res.status(200).send(projectStored);
            }
        })

        return res.status(200).send({project, message: 'Metodo saveProject works!'});
    },

    getProject: function(req, res){
        var projectId = req.params.id;

        if(projectId == null)
            return res.status(404).send({message: 'El proyecto no existe'});

        Project.findById(projectId, (err, projectStored) => {
            if(err){
                res.status(500).send({message: 'Error en la peticion'});
            }
            else if(!projectStored){
                res.status(404).send({message: 'El proyecto no existe'});
            }
            else{
                res.status(200).send(projectStored);
            }
        })
    }
}
    
    module.exports = controller;