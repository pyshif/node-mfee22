const mysql = require('mysql2');
require('dotenv').config();
// 資料庫連線

// const conn = mysql.createConnection({
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // 加上連線數限制
    connectionLimit: 10,
});

module.exports = pool.promise();

// const promisePool = pool.promise();
// const [rows, fields] = await promisePool.query(...);
