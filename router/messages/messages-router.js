//import express objects
const express = require('express');

//setup Student Object
const Messages = require('./messages-models');

//set up router object
const router = express.Router();

/** MESSAGES ENDPOINTS */

//READ
//get full list of messages
router.get('/', (req, res) => {
    Messages.getMessages(req.token.id)
        .then(appMessages => {
            res.status(201).json({ errorMessage: 'Rendering message list', appMessages })
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Server error, could not render message list', err })
        })
})

router.get('/:id', (req, res) => {
    Messages.findMessage(id)
        .then(appMessage => {
            if (!appMessage) {
                res.status(404).json({ errorMessage: 'Could not find the message with set id, please try again' })
            } else {
                res.status(201).json({ message: 'Pulling up message information', appMessage })
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "Server error, could not find message", err })
        })
})

//CREATE
//add new message
router.post('/', (req, res) => {
    const messageData = req.body;

    Messages.addMessage({ ...messageData, user_id: req.token.id })
        .then(newMessage => {
            res.status(201).json({ message: 'Message successfully added.', newMessage })
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Server error, could not add message' })
        })
})


//UPDATE
//edit message
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Messages.findMessage(id)
        .then(appMessage => {
            if (!appMessage) {
                res.status(404).json({ errorMessage: 'Could not update message with set id, please try again.' })
            } else {
                Messages.editMessage(changes, id)
                    .then(updated => {
                        res.status(201).json({ message: 'Message successfully updated', updated })
                    })
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Server error, could not update message', err })
        })
})


//DELETE
router.get('/', (req, res) => {
    const { id } = req.params;

    Messages.deleteMessage(id)
        .then(deleted => {
            if (!deleted) {
                res.status(404).json({ errorMessage: 'Could not delete message with set id, please try again.' })
            } else {
                res.status(201).json({ message: 'Message successfully deleted', deleted })
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Server error, could not delete message.' })
        })
})

module.exports = router;