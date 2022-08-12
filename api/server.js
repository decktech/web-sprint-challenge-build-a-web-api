const express = require('express');
const projectsRouter = require('./projects/projects-router.js');
const server = express();

server.use(express.json());

server.use('/api/projects', projectsRouter)

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use((err, req, res, next) => {
    let { status = 500, message = 'internal server error' } = err;
    res.status(status).json({ message: message });
  });

module.exports = server;
