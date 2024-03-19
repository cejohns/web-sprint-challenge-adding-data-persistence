// build your `/api/resources` router here


// Import necessary modules
const express = require('express');
const router = express.Router();
const Resource = require('./model'); // Corrected path for the Resource model




// POST /api/resources - Create a new resource
router.post('/', async (req, res) => {
  const { resource_name, resource_description } = req.body;
  if (!resource_name ) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    // Assuming Resource.create() inserts the resource into the database
    // and returns the newly created resource object
    const newResource = await Resource.create({
      resource_name,
      resource_description: resource_description || null // Explicitly set to null if undefined
    })

    if (!newResource) {
      console.error("Resource creation returned null:", newResource);
      return res.status(500).json({ message: 'Resource creation failed' });
    }

    console.log("New Resource Created:", newResource);
    res.status(201).json(newResource); // Changed to return the full newResource object
  } catch (error) {
    console.error(error);
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
