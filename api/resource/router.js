// build your `/api/resources` router here


// Import necessary modules
const express = require('express');
const router = express.Router();
const Resource = require('./model'); // Corrected path for the Resource model

// POST /api/resources - Create a new resource
router.post('/', async (req, res) => {
  const { resource_name, resource_description } = req.body;
  if (!resource_name || !resource_description) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    // Create a new resource and store the result
    const newResource = await Resource.create(req.body);

    // Return the newly created resource
    res.status(201).json(newResource);
  } catch (error) {
    console.error('Failed to create resource:', error);
    res.status(500).json({ message: 'Failed to create resource', error: error.message });
  }
});






// GET /api/resources - Fetch all resources
router.get('/', async (req, res) => {
  try {
    const resources = await Resource.findAll();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
