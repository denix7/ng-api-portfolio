'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();

//middleware necesario para subir ficheros
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});

router.get('/home', ProjectController.home);
router.post('/project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/project-list/:page?', ProjectController.getProjects);
router.put('/project/:id?', ProjectController.updatedProject);
router.delete('/project/:id?', ProjectController.deleteProject);
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);

module.exports = router; 