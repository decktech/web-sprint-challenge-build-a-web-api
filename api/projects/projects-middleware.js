// add middlewares here related to projects
const Project = require('./projects-model.js');

function validateProjectId(req, res, next) {
    Project.get(req.params.id)
        .then(result => {
            if (result == null) {
                next({ status: 404, message: 'project not found'});
            } else {
                req.existingProject = result;
                next();
            }
        })
        .catch(err => next(err));
}

function validateProject(req, res, next) {
    if (req.body.name == null || req.body.name === "") {
        next({ status: 400, message: 'missing name' });
    } else if (req.body.description == null || req.body.description === "") {
        next({ status: 400, message: 'missing description' });
    } else if (req.body.completed == null) {
        next({ status: 400, message: 'must show completed' });
    } else {
        req.newProject = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            completed: req.body.completed
        }
        next();
    }
}

module.exports = {
    validateProjectId,
    validateProject
}