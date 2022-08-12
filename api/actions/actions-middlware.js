// add middlewares here related to actions
const Action = require('./actions-model.js');

function validateActionId(req, res, next) {
    Action.get(req.params.id)
        .then(action => {
            if (action == null) {
                next({ status: 404, message: "action not found" });
            } else {
                req.existingAction = action;
                next();
            }
        })
        .catch(err => next(err))
}

function validateAction(req, res, next) {
    if (req.body.project_id == null) {
        next({ status: 400, message: 'missing project_id' });
    } else if (req.body.description == null || req.body.description === "") {
        next({ status: 400, message: 'missing required description field' });
    } else if (req.body.notes == null || req.body.notes === "") {
        next({ status: 400, message: 'missing required notes field' });
    } else {
        req.newAction = { 
            project_id: req.body.project_id, 
            description: req.body.description,
            notes: req.body.notes,
            completed: req.body.completed
        }
        next();
    }
}

module.exports = {
    validateActionId,
    validateAction
}