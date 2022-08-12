// Write your "projects" router here!
const express = require('express');

const Project = require('./projects-model.js');

const { validateProjectId } = require('./projects-middleware')

const router = express.Router();

router.get('/', (req, res) => {
    Project.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(err => next(err))
})

router.get('/:id', validateProjectId, (req, res) => {
    Project.get(req.params.id)
        .then(project => {
            res.json(req.existingProject)
        })
})



module.exports = router;