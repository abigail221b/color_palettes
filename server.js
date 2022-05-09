const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

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
    database: process.env.DB_NAME,
    multipleStatements: true
});
connection.connect();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Split the given string id into color codes, then return them as an array
function extract_colors_from(id) {
    let paletteID = id;
    let color0 = paletteID.substr(0,  6);
    let color1 = paletteID.substr(6,  6);
    let color2 = paletteID.substr(12, 6);
    let color3 = paletteID.substr(18, 6);
    let color4 = paletteID.substr(24, 6);

    return [color0, color1, color2, color3, color4];
}

// GET a color palette by id
app.get("/palette/:id", (req, res) => {
    let colors = extract_colors_from(req.params.id);

    connection.query(`SELECT * FROM color_palette WHERE color0='${colors[0]}' AND color1='${colors[1]}' AND color2='${colors[2]}' AND color3='${colors[3]}' AND color4='${colors[4]}'`,
        (err, rows) => {
            if (err) throw err;
            res.send({ palette: rows[0] });
        });
});

// Create a color palette
app.post("/palette/create", (req, res) => {
    let colors = req.body.colors.map(color => color.replace("#", ""));
    connection.query(`INSERT INTO color_palette (color0, color1, color2, color3, color4, date_created, num_likes)
                      VALUES ('${colors[0]}', '${colors[1]}', '${colors[2]}', '${colors[3]}', '${colors[4]}', CURRENT_TIMESTAMP(), 0)`,
        (err, rows) => {
            if (err) throw err;
            res.send(rows);
        });
});

// GET new color palettes (15 palettes at a time)
app.get("/palettes/new/:page", (req, res) => {
    let num_palettes = 15;
    let page = req.params.page;
    let offset = page * num_palettes;
    connection.query(`SELECT * FROM color_palette ORDER BY date_created DESC LIMIT ${offset},${num_palettes}`,
        (err, rows) => {
            if (err) throw err;
            res.send(rows);
        });
});
  
// GET popular color palettes (15 palettes at a time)
//  - of all time
//  - this year
//  - this month
//  - this week
const TIME_FILTER = {
    ALL_TIME: "all_time",
    THIS_YEAR: "this_year",
    THIS_MONTH: "this_month",
    THIS_WEEK: "this_week"
};
app.get("/palettes/popular/:time_filter/:page", (req, res) => {
    let time_filter = req.params.time_filter;
    let page = req.params.page;
    let num_palettes = 15;
    let offset = page * num_palettes;
    let query = "";

    switch(time_filter) {
        case TIME_FILTER.THIS_YEAR:
            query = `SELECT * FROM color_palette WHERE YEAR(date_created) = YEAR(CURRENT_DATE()) ORDER BY num_likes DESC LIMIT ${offset},${num_palettes};`;
            break;
        case TIME_FILTER.THIS_MONTH:
            query = `SELECT * FROM color_palette WHERE YEAR(date_created) = YEAR(CURRENT_DATE()) AND MONTH(date_created) = MONTH(CURRENT_DATE()) ORDER BY num_likes DESC LIMIT ${offset},${num_palettes};`;
            break;
        case TIME_FILTER.THIS_WEEK:
            query = `SELECT * FROM color_palette WHERE YEAR(date_created) = YEAR(CURRENT_DATE()) AND MONTH(date_created) = MONTH(CURRENT_DATE()) AND WEEK(date_created) = WEEK(CURRENT_DATE()) ORDER BY num_likes DESC LIMIT ${offset},${num_palettes};`;
            break;
        default:
            query = `SELECT * FROM color_palette  ORDER BY num_likes DESC LIMIT ${offset},${num_palettes};`;
    }
    connection.query(query, (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

app.get("/", (req, res) => {
    res.send("Color Palettes");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${ PORT }`);
});
