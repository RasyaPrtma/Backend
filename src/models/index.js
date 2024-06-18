/**
 * Modul untuk membuat pool koneksi ke database MySQL.
 * @module database
 */

const mysql = require('mysql2/promise');

/**
 * Pool koneksi ke database MySQL.
 * @type {mysql.Pool}
 */
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'apilsp',
    waitForConnections: true,
    connectionLimit: 10,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    namedPlaceholders: true,
});

/**
 * Menguji koneksi ke database MySQL.
 */
pool.getConnection()
    .then(conn => {
        console.log('Connected to MySQL database');
        conn.release();
    })
    .catch(err => {
        console.error('Unable to connect to MySQL database:', err);
    });

module.exports = pool;
