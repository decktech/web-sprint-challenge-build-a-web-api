// add middlewares here related to projects
const Project = require('./projects-model.js');

function validateProjectId(req, res, next) {
    Project.get(req.params.id)
        .then(result => {
            if (result == null) {
                next({ status: 404, message: 'project not found'})
            } else {
                req.existingProject = result;
                next();
            }
        })
        .catch(err => next(err))
}

module.exports = {
    validateProjectId,
}