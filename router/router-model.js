//import the database
const db = require('../data/config');

//helper functions

/** USER HELPER FUNCTIONS */
//add user
function addUser(user){
    return db('users')
        .insert(user, 'id')
        .then(([id]) => {
            return findUser(id)
        })
}

//find user by their id
function findUser(id) {
    return db('users').where({id}).first();
}

//find user by their id
function findUserByEmail(email) {
    return db('users').select().where({email}).first();
}

/** STUDENT HELPER FUNCTIONS */
//get a list of all the students under the user
function getStudents(){
    return db('students').where({professor_id});
}

//get student by their id
function findStudent(id) {
    return db('students').where({id}).first()
}

//add new student
function addStudent(student){
    return db('students')
        .insert(student, 'id')
        .then(([id]) => {
            return findStudent(id)
        });
}

//add new project to student object
function addProject(project, student_id){
    return db('projects')
        .insert({...project, student_id})
        .then(([id]) => {
            return findProject(id);
        })
}

//edit Student information
function editStudent(changes, id) {
    return db('students')
        .where('id', id)
        .update(changes)
        .then(updated => {
            updated > 0 ? findStudent(id) : null
        })
}

//delete student
function deleteStudent(id) {
    return db('students')
        .where('id', id)
        .del()
}


/** PROJECT HELPER FUNCTIONS */
//find the project by its id
function findProject(id) {
    return db('projects').where({id}).first();
}

//add a new message to the professor dashboard
function addMessage(message){
    return db('messages')
        .insert({...message, user_id})
        .then(([id]) => {
            return findMessage(id);
        });
}

/** MESSAGE HELPER FUNCTIONS */

//find the message by its id
function findMessage(id) {
    return db('messages').where({id}).first();
}

module.exports = {
    findUser,
    findUserByEmail,
    findStudent,
    findProject,
    findMessage,
    addUser,
    addStudent,
    addProject,
    addMessage,
    getStudents,
    editStudent,
    deleteStudent
}
