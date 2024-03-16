// build your `/api/tasks` router here


// Import express and initialize router
const express = require('express');
const router = express.Router();
const Task = require('./model'); // Ensure the path to your Task model is correct

// POST /api/tasks - Create a new task
router.post('/', async (req, res) => {
  try {
    const newTask = await Task.create(req.body); // Assumes Task.create handles insertion
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET /api/tasks - Fetch all tasks with their related project details
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
