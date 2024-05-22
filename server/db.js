// db.js
const { Pool } = require('pg');

// Create a new pool instance with your database configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'libraryDB',
  password: 'root',
  port: 5432, // default port for PostgreSQL
});

// Export the pool instance for use in other modules
module.exports = pool;
