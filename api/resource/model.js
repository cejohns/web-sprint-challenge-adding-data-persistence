// build your `Resource` model here


const knex = require('../../db'); // This path goes up two levels from the model to the root
  


const Resource = {
  // Create a new resource
  async create({ resource_name, resource_description }) {
    let insertedResource;
    try {
      // Execute the insert operation
      const result = await knex('resources').insert({
        resource_name,
        resource_description,
      }, 'resource_id');

      // Assuming 'result' is an array containing the 'resource_id' of the newly inserted resource.
      // This assumption needs to be verified based on the behavior of your specific database.
      const resource_id = Array.isArray(result) ? result[0] : result;

      // Ensure the 'resource_id' is valid
      if (!resource_id) {
        throw new Error("Failed to retrieve 'resource_id' after resource creation.");
      }

      // Retrieve the full resource record by its 'resource_id'
      insertedResource = await this.findById(resource_id);

    } catch (error) {
      console.error("Error creating resource:", error);
      throw new Error("Failed to create resource.");
    }

    // Check if the resource was successfully retrieved
    if (!insertedResource) {
      throw new Error("Failed to retrieve the newly created resource.");
    }

    return insertedResource;
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
