
const mysql = require('mysql2');
require('dotenv').config();

// Configuration de la connexion MySQL
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio_makosso',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000
};

// Création du pool de connexions
const pool = mysql.createPool(dbConfig);

// Promisify pour async/await
const promisePool = pool.promise();

// Test de connexion
promisePool.getConnection()
  .then(connection => {
    console.log('✅ Connexion MySQL établie avec succès');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Erreur de connexion MySQL:', err.message);
  });

module.exports = promisePool;
