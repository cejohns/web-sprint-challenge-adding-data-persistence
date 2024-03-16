// build your `Project` model here

const express = require('express');
const router = express.Router();
const Project = require('../models/Project'); // Adjust the path as necessary

// POST /api/projects - Create a new project
router.post('/', async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add other routes here, utilizing the Project model as needed

module.exports = router;
