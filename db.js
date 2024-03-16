// db.js

const knex = require('knex');
const config = require('./knexfile'); // The relative path to your knexfile from the root
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const connection = knex(environmentConfig);

module.exports = connection;
