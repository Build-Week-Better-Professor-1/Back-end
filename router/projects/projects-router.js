//import express objects
const express = require('express');

//setup Student Object
const Projects = require('./projects-models.js');

//set up router object
const router = express.Router();

/** PROJECT ENDPOINTS */

//READ
//get list of projects
router.get('/', (req, res) => {
    Projects.getProjects()
        .then(projects => {
            res.status(201).json({ message: 'Rendering project list: ', projects })
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Server error, could not render project list. Contact backend.', err })
        })
})

//get project by id
router.get('/:id', (req, res) => {
    Projects.findProject(id)
        .then(project => {
            if (!project){
                res.status(404).json({errorMessage: 'Could not find project with set id.'})
            } else {
                res.status(201).json({message: 'Pulling up project information: ', project})
            }
        })
        .catch(err => {
            res.status(500).json({errorMessage: "Server error, could not find project id. Contact backend.", err})
        })
})


//CREATE
//add project to database and assign to student
router.post('/', (req, res) => {
    const projectData = req.body;

    Projects.addProject({...projectData, student_id})
        .then(project => {
            res.status(201).json({message: 'Project successfully added', project})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Server error, project not added.', err})
        })
})


//UPDATE
//edit project details
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    Projects.editProject(id)
        .then(project => {
            if(!project) {
                res.status(404).json({errorMessage: 'Could not find project with set id, please try again'})
            } else {
                res.status(201).json({message: 'Project information updated'})
            }
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'Server error, unable to edit project', err})
        })
})

//DELETE
//delete project
router.delete('/:id', (req, res) => {
    const {id} = req.params

    Projects.deleteProject(id)
        .then(deleted => {
            if(!deleted) {
                res.status(404).json({errorMessage: 'Could not delete the project with the set id, please try again.'})
            } else {
                res.status(201).json({message: "Project deleted", deleted})
            }
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'Server error, could not delete project.'})
        })
})