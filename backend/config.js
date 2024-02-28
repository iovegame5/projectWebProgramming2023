const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'cloudprojectdatabase.c3a44mycgtjj.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'db-password',
  database: 'wp_project',


  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
