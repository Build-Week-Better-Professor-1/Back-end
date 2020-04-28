//import the database
const db = require('../../data/config');

//helper functions

/** PROJECT HELPER FUNCTIONS */

//get list of projects
function getProjects(professor_id) {
    return db('projects').select().where({professor_id});
}

//get project by id
function findProject(id) {
    return db('projets').where({id}).first();
}

//add project
function addProject(newProject){
    return db('projects')
        .insert(newProject)
        .then(ids => {
            const [id] = ids
            return findProject(id)
        })
}

//update project
function editProject(changes, id) {
    return db('projects')
        .where('id', id)
        .update(changes)
        .then(updated => {
            updated > 0 ? findProject(id) : null
        })
}

//delete function
function deleteProject(id){
    return db('projects')
        .where('id', id)
        .del()
}

module.exports = {
    getProjects,
    findProject,
    addProject,
    editProject,
    deleteProject
}