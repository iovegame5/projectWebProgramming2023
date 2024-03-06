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
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to MySQL successfully');
    connection.release();
  } catch (err) {
    console.log('Error connecting to MySQL:', err);
  } finally {
    // Close the connection pool when done

  }
})();

module.exports = pool;
 