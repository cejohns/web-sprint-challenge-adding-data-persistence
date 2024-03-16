// build your `/api/tasks` router here


// Import express and initialize router
const express = require('express');
const router = express.Router();
const Task = require('./model'); // Ensure the path to your Task model is correct

router.post('/', async (req, res) => {
  try {
    let newTask = await Task.create(req.body); // Assumes Task.create handles insertion
    
    // Safely check and convert 'task_completed'
    if (Object.prototype.hasOwnProperty.call(newTask, 'task_completed')) {
      newTask.task_completed = Boolean(newTask.task_completed);
    }

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
