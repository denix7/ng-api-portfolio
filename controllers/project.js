'use strict'

var Project = require('../models/project');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');

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
    },

    getProjects: function(req, res){
        var page = 1;
        var itemsPerPage = 3;

        if(req.params.page)
            page = req.params.page;

        Project.find().sort('-year').paginate(page, itemsPerPage, (err, projects, total) => {
            if(err){
                res.status(500).send({message: 'Error en la peticion'});
            }
            else if(!projects){
                res.status(404).send({message: 'No existen proyectos'});
            }
            else{
                res.status(200).send({
                    total_projects: total,
                    pages: Math.ceil(total/itemsPerPage),
                    projects: projects
                })
            }
        })
    },

    updatedProject: function(req, res){
        var projectId = req.params.id;
        var update = req.body;

        if(!projectId)
            return res.status(500).send({message: 'Necesita enviar un id de proyecto'});

        Project.findByIdAndUpdate(projectId, update, {new:true}, (err, updatedProject) => {
            if(err){
                res.status(500).send({message: 'Error en la peticion'});
            }
            else if(!updatedProject){
                res.status(404).send({message: 'El proyecto que desea actualizar no existe '});
            }
            else{
                res.status(200).send({updatedProject});
            }
        })
    }, 

    deleteProject: function(req, res){
        var projectId = req.params.id;

        if(!projectId)
            return res.status(500).send({message: 'Necesita enviar un id de proyecto'});

        Project.findByIdAndDelete(projectId, (err, projectRemoved) => {
            if(err){
                res.status(500).send({message: 'Error en la peticion'});
            }
            else if(!projectRemoved){
                res.status(404).send({message: 'El proyecto que desea eliminar no existe'});
            }
            else{
                res.status(200).send({projectRemoved});
            }
        })
    },

    uploadImage: function(req, res){
        var projectId = req.params.id;
        var fileName = 'Imagen no subida';

        if(req.files){
            console.log(req.files)
            var filePath = req.files.imge.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];

            //extension del archivo
            var extensionSplit = fileName.split('\.');
            var fileExtension = extensionSplit[1];

            if(fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'jpeg' || fileExtension == 'gif') {
                Project.findByIdAndUpdate(projectId, {image: fileName}, (err, projectUpdated) => {
                    if(err){
                        return res.status(500).send({message: 'La imagen no se ha subido'});
                    }
                    else if(!projectUpdated){
                        return res.status(404).send({message: 'El proyecto no existe'});
                    }    
                    else{
                        return res.status(200).send({projectUpdated});
                    }
                })
            }else{
                fs.unlink(filePath, (err) => {
                    return res.status(500).send({message: 'El archivo debe ser una imagen'});
                }) 
            }

        }else{
            return res.status(200).send({message: fileName})
        }
    } 
}
    
    module.exports = controller;