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
const FILTER = {
    ALL: "all",
    YEAR: "year",
    MONTH: "month",
    WEEK: "week",
}
router.get("/popular/", (req, res) => {
    let filter = req.query.filter;
    let num_palettes = req.query.limit;
    let page = req.query.page;
    let offset = (page - 1) * num_palettes;
    let query = "SELECT * FROM color_palette NATURAL JOIN user_creates_palette ";

    switch(filter) {
        case FILTER.YEAR:
            query = query +
                    `WHERE YEAR(date_created) = YEAR(CURRENT_DATE())
                    ORDER BY num_likes DESC
                    LIMIT ${ offset }, ${ num_palettes }`;
            break;
        case FILTER.MONTH:
            query = query +
                    `WHERE YEAR(date_created) = YEAR(CURRENT_DATE()) AND
                    MONTH(date_created) = MONTH(CURRENT_DATE)
                    ORDER BY num_likes DESC
                    LIMIT ${ offset }, ${ num_palettes }`;
            break;
        case FILTER.WEEK:
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

// Get color palette by its colors
router.get("/:color0/:color1/:color2/:color3/:color4", (req, res) => {
    pool.query(`SELECT *
                FROM color_palette
                WHERE color0 = '${ req.params.color0 }'
                    AND color1 = '${ req.params.color1 }'
                    AND color2 = '${ req.params.color2 }'
                    AND color3 = '${ req.params.color3 }'
                    AND color4 = '${ req.params.color4 }'`,
        (err, rows) => {
            if (err) throw err;
            res.send(rows[0]);
        });
});

/*
    Handle like and unlike by a specific user.
    ex. /palettes/:color0/:color1/:color2/:color3/:color4/?username=demoUser121&like=true
*/
router.put("/:color0/:color1/:color2/:color3/:color4/", (req, res) => {
    if(req.query.like === "true") {
        pool.query(`INSERT INTO user_likes_palette
                    VALUES ('${req.query.username}', '${req.params.color0}', '${req.params.color1}', '${req.params.color2}', '${req.params.color3}', '${req.params.color4}');
                    UPDATE color_palette
                    SET num_likes = num_likes+1
                    WHERE color0='${req.params.color0}' AND color1='${req.params.color1}' AND color2='${req.params.color2}' AND color3='${req.params.color3}' AND color4='${req.params.color4}'`,
                (err, rows) => {
                    if(err) throw err;
                    res.send(rows);
                });
    } else {
        pool.query(`DELETE FROM user_likes_palette WHERE username='${req.query.username}' AND color0='${req.params.color0}'AND color1='${req.params.color1}'AND color2='${req.params.color2}'AND color3='${req.params.color3}'AND color4='${req.params.color4}';
                    UPDATE color_palette
                    SET num_likes = num_likes - 1
                    WHERE color0='${req.params.color0}' AND color1='${req.params.color1}' AND color2='${req.params.color2}' AND color3='${req.params.color3}' AND color4='${req.params.color4}'`,
            (err, rows) => {
                if (err) throw err;
                res.send(rows);
            });
    }
});

// Get color palettes liked by a specific user
router.get("/user/:username/likes", (req, res) => {
    pool.query(`SELECT *
            FROM user_likes_palette ulp LEFT JOIN color_palette p ON ulp.color0=p.color0 AND ulp.color1=p.color1 AND ulp.color2=p.color2 AND ulp.color3=p.color3 AND ulp.color4=p.color4
            WHERE username='${ req.params.username }'`,
    (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

// Get color palettes created by a specific user
router.get("/user/:username", (req, res) => {
    pool.query(`SELECT *
                FROM user_creates_palette ucp LEFT JOIN color_palette p ON ucp.color0=p.color0 AND ucp.color1=p.color1 AND ucp.color2=p.color2 AND ucp.color3=p.color3 AND ucp.color4=p.color4
                WHERE username='${ req.params.username }'
                ORDER BY date_created DESC`,
        (err, rows) => {
            if (err) throw err;
            res.send(rows);
        });
});

module.exports = router;
