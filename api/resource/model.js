// build your `Resource` model here


const knex = require('../../db'); // This path goes up two levels from the model to the root
  


const Resource = {
  // Create a new resource
  async create({ resource_name, resource_description }) {
    try {
      const [newResourceId] = await knex('resources').insert({
        resource_name,
        resource_description,
      }, 'resource_id');
  
      console.log(newResourceId);
      
      if (!newResourceId) {
        throw new Error("Failed to retrieve 'resource_id' after resource creation.");
      }


      // Retrieve the newly created resource from the database
      const resource = await knex('resources').where({ resource_id: newResourceId }).first();

      if (!resource) {
        throw new Error("Failed to retrieve the newly created resource.");
      }

      // Return the full resource object
      return resource;
    } catch (error) {
      console.error("Error creating resource:", error);
      throw new Error("Failed to create resource.");
    }

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
