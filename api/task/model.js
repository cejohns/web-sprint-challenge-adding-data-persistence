// build your `Task` model here

// models/Task.js
const knex = require('../../db'); // This path goes up two levels from the model to the root

const Task = {
  async create({ task_description, task_notes, task_completed, project_id }) {
    const [task_id] = await knex('tasks').insert({
      task_description,
      task_notes,
      task_completed: task_completed ? 1 : 0,
      project_id,
    });
    return knex('tasks').where({ task_id }).first();
  },

  async findAll() {
    return knex('tasks')
      .join('projects', 'tasks.project_id', 'projects.project_id')
      .select(
        'tasks.*',
        'projects.project_name',
        'projects.project_description'
      )
      .then(tasks => tasks.map(task => ({
        ...task,
        task_completed: !!task.task_completed,
      })));
  },

  // You can add more methods as needed
};

module.exports = Task;

