//import express objects
const express = require('express');

//setup Student Object
const Students = require('./student-models');

//set up router object
const router = express.Router();

/** STUDENT ENDPOINTS */

//READ

//get all students
router.get('/', (req, res) => {
    Students.getStudents(req.token.id)
        .then(students => {
            res.status(201).json({message: 'Rendering student list: ', students})
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'Server error, could not render student list. Contact backend.', err})
        })
})

//get student by id
router.get('/:id', (req, res) => {
    Students.findStudent(id)
        .then(student => {
            if (!student){
                res.status(404).json({errorMessage: 'Could not find student with set id.'})
            } else {
                res.status(201).json({message: 'Pulling up student information: ', student})
            }
        })
        .catch(err => {
            res.status(500).json({errorMessage: "Server error, could not find student id. Contact backend.", err})
        })
})

//CREATE
//add student
router.post('/', (req, res) => {
    const studentData = req.body;

    Students.addStudent({...studentData, professor_id: req.token.id})
        .then(student => {
            res.status(201).json({message: 'Student successfully added', student})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Server error, student not added.', err})
        })
})


//UPDATE
//edit student
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    Students.findStudent(id)
        .then(student => {
            if(!student) {
                res.status(404).json({errorMessage: "Unable to edit student; set id not found."})
            } else {
                Students.editStudent(changes, id)
                    .then(updated => {
                        res.status(200).json({message: "Student information updated.", updated});
                    })
            }
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'Server errror, unable to update student', err})
        })
})


//DELETE
//delete student
router.delete('/:id', (req, res) => {
  const {id} = req.param;
  
  Students.deleteStudent(id)
    .then(deleted => {
        if(!deleted) {
            res.status(404).json({errorMessage: 'Unable to delete student; set id not found.'})
        } else {
            res.status(201).json({message: 'Student successfully deleted.', deleted})
        }
    })
    .catch(err => {
        res.status(500).json({errorMessage: 'Server errror, unable to delete student', err})
    })
})

module.exports = router;
