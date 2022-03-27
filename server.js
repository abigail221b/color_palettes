const express = require("express");
const app = express();
const PORT = process.env.port || 5000;

// Load db environment variables
if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

// Setup MySQL database connection
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
connection.connect();

app.get("/", (req, res) => {
    res.send("Color Palettes");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${ PORT }`);
});
