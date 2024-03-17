// build your `Resource` model here


const knex = require('../../db'); // This path goes up two levels from the model to the root
  


const Resource = {
  // Create a new resource
  async create({ resource_name, resource_description }) {
    const [resource_id] = await knex('resources').insert({
      resource_name,
      resource_description,
    }, 'resource_id'); // Ensuring 'resource_id' is returned after the insert operation
    return this.findById(resource_id);
  },

  // Find a resource by ID
  async findById(resource_id) {
    const resource = await knex('resources').where({ resource_id }).first();
    return resource;
  },

  // Fetch all resources
  async findAll() {
    const resources = await knex('resources').select();
    return resources;
  },

  // Add more methods as necessary (e.g., update, delete)
};

module.exports = Resource;
