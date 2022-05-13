const mysql = require("mysql2");

// Load db environment variables
if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    multipleStatements: true
});

module.exports = pool;
