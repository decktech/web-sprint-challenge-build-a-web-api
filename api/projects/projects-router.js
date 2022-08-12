// Write your "projects" router here!
const express = require('express');

const Project = require('./projects-model.js');

const { validateProjectId, validateProject } = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res) => {
    Project.get()
        .then(projects => {
            res.json(projects);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error retrieving projects'})
          })
})

router.get('/:id', validateProjectId, (req, res) => {
    Project.get(req.params.id)
        .then(project => {
            res.json(req.existingProject);
        })
})

router.post('/', validateProject, (req, res) => {
    Project.insert(req.newProject)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error adding project'})
          })
})

router.put('/:id', validateProject, validateProjectId, (req, res) => {
    Project.update(req.params.id, req.newProject)
        .then(project => {
            res.json(project)
        })
})

router.delete('/:id', validateProjectId, (req, res) => {
    Project.remove(req.params.id)
        .then(result => {
            res.json(result)
        })
})

router.get('/:id/actions', validateProjectId, (req, res) => {
    Project.getProjectActions(req.params.id)
        .then(actions => {
            res.json(actions)
        })
})


module.exports = router;