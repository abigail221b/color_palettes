const express = require("express");
const router = express.Router();
const pool = require("../database_pool.js");

/* GET new color palettes */
router.get("/new", (req, res) => {
    let num_palettes = req.query.limit;
    let page = req.query.page;
    let offset = (page - 1) * num_palettes;

    pool.query(`SELECT *
                FROM color_palette NATURAL JOIN user_creates_palette
                ORDER BY date_created DESC
                LIMIT ${ offset }, ${ num_palettes }`,
        (err, rows) => {
            if (err) return err;
            res.send(rows);
        });
});

/*
    Get Popular palettes
    - of all time
    - this year
    - this month
    - this week
*/
const SORT = {
    ALL: "all",
    YEAR: "year",
    MONTH: "month",
    WEEK: "week",
}
router.get("/popular/:sort", (req, res) => {
    let sort = req.params.sort;
    let num_palettes = req.query.limit;
    let page = req.query.page;
    let offset = (page - 1) * num_palettes;
    let query = "SELECT * FROM color_palette NATURAL JOIN user_creates_palette ";

    switch(sort) {
        case SORT.YEAR:
            query = query +
                    `WHERE YEAR(date_created) = YEAR(CURRENT_DATE())
                    ORDER BY num_likes DESC
                    LIMIT ${ offset }, ${ num_palettes }`;
            break;
        case SORT.MONTH:
            query = query +
                    `WHERE YEAR(date_created) = YEAR(CURRENT_DATE()) AND
                    MONTH(date_created) = MONTH(CURRENT_DATE)
                    ORDER BY num_likes DESC
                    LIMIT ${ offset }, ${ num_palettes }`;
            break;
        case SORT.WEEK:
            query = query +
                    `WHERE YEAR(date_created) = YEAR(CURRENT_DATE()) AND
                    MONTH(date_created) = MONTH(CURRENT_DATE()) AND
                    WEEK(date_created) = WEEK(CURRENT_DATE())
                    ORDER BY num_likes DESC
                    LIMIT ${ offset }, ${ num_palettes }`;
            break;
        default:
            query = query +
                    `WHERE YEAR(date_created) = YEAR(CURRENT_DATE())
                    ORDER BY num_likes DESC
                    LIMIT ${ offset }, ${ num_palettes }`;
    };

    pool.query(query, (err, rows) => {
        if (err) return err;
        res.send(rows);
    });
});

// Create a new Color Palette
router.post("/", (req, res) => {
    let colors = req.body.colors.map(color => color.replace("#", ""));
    pool.query(`INSERT INTO color_palette (color0, color1, color2, color3, color4, date_created, num_likes)
                VALUES ('${ colors[0] }', '${ colors[1] }', '${ colors[2] }', '${ colors[3] }', '${ colors[4] }', CURRENT_TIMESTAMP(), 0);
                INSERT INTO user_creates_palette
                VALUES ('${ req.body.username }','${ colors[0] }', '${ colors[1] }', '${ colors[2] }', '${ colors[3] }', '${ colors[4] }')`, (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

module.exports = router;
