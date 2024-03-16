// build your `/api/projects` router here

// Import necessary modules
const express = require('express');
const router = express.Router();
const knex = require('../../db'); // This path goes up two levels from the model to the root
// GET /api/projects - Fetch all projects
router.get('/', async (req, res) => {
  try {
    let projects = await knex('projects').select();
    // Assuming direct conversion is not possible and batch process is needed
    projects = projects.map(project => ({
      ...project,
      project_completed: Boolean(project.project_completed),
    }));
    res.json(projects);
  } catch (error) {
    // Using a standardized error handling approach could simplify this
    res.status(500).json({ message: error.message });
  }
});


// POST /api/projects - Create a new project
router.post('/', async (req, res) => {
  try {
    const [project_id] = await knex('projects').insert({
      project_name: req.body.project_name,
      project_description: req.body.project_description,
      project_completed: req.body.project_completed ? 1 : 0, // Convert boolean to integer
    });
    const newProject = await knex('projects').where({ project_id }).first();
    // Convert integer back to boolean for response
    newProject.project_completed = !!newProject.project_completed;
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export the router
module.exports = router;
