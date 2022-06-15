const express = require("express");
const router = express.Router();
const pool = require("../database_pool.js");

/* Get a color palette by id */
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

/* Create a new color palette */
router.post("/create", (req, res) => {
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
