// Write your "actions" router here!
const express = require('express');

const Action = require('./actions-model.js');

const { validateActionId, validateAction } = require('./actions-middlware.js');

const router = express.Router();

router.get('/', (req, res) => {
    Action.get()
        .then(actions => {
            res.json(actions);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error retrieving actions'});
          })
})

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.existingAction);
})

router.post('/', validateAction, (req, res) => {
    Action.insert(req.newAction)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error creating action'});
          })
})

router.put('/:id', validateAction, validateActionId, (req, res) => {
    Action.update(req.params.id, req.newAction)
        .then(action => {
            res.json(action)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error updating action'});
          })
})

router.delete('/:id', validateActionId, (req, res) => {
    Action.remove(req.params.id)
        .then(() => {
            res.json(req.existingAction)
        })
})

module.exports = router;