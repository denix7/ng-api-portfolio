'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();

//middleware necesario para subir ficheros
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/get-project/:id?', ProjectController.getProject);
router.get('/get-project-list/:page?', ProjectController.getProjects);
router.put('/edit-project/:id?', ProjectController.updatedProject);
router.delete('/delete-project/:id?', ProjectController.deleteProject);
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);

module.exports = router; 