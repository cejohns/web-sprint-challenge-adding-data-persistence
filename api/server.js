const express = require('express');
const app = express();

// Correct the paths based on your project structure
const tasksRouter = require('./task/router'); // Path corrected for tasks router
const projectsRouter = require('./project/router'); // Path corrected for projects router
const resourcesRouter = require('./resource/router'); // Add this line for resources router

app.use(express.json()); // Middleware to parse JSON bodies
app.use('/api/tasks', tasksRouter); // Use the tasks router
app.use('/api/projects', projectsRouter); // Use the projects router
app.use('/api/resources', resourcesRouter); // Use the resources router, if you have one

// Export the app for use in other files (like index.js or test files)
module.exports = app;

