exports.up = function(knex) {
    return knex.schema.createTable('project_resources', table => {
      table.increments('assignment_id'); // Primary key
      table.integer('project_id').unsigned().notNullable().references('project_id').inTable('projects').onDelete('CASCADE');
      table.integer('resource_id').unsigned().notNullable().references('resource_id').inTable('resources').onDelete('CASCADE');
      // Optionally, add any additional fields you think are necessary.
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('project_resources');
  };
  