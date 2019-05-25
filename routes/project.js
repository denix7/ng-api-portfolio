'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/get-project/:id?', ProjectController.getProject);
router.get('/get-project-list/:page?', ProjectController.getProjects);
router.put('/edit-project/:id?', ProjectController.updatedProject);
router.delete('/delete-project/:id?', ProjectController.deleteProject);

module.exports = router; 