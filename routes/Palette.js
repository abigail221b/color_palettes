const express = require("express");
const router = express.Router();
const pool = require("../database_pool.js");

/* Get a color palette by id */
router.get("/:id", (req, res) => {
    let paletteID = req.params.id;
    let color0 = paletteID.substr(0,  6);
    let color1 = paletteID.substr(6,  6);
    let color2 = paletteID.substr(12, 6);
    let color3 = paletteID.substr(18, 6);
    let color4 = paletteID.substr(24, 6);

    pool.query(`SELECT *
                FROM color_palette
                WHERE color0 = '${ color0 }'
                    AND color1 = '${ color1 }'
                    AND color2 = '${ color2 }'
                    AND color3 = '${ color3 }'
                    AND color4 = '${ color4 }'`,
        (err, rows) => {
            if (err) throw err;
            res.send(rows[0]);
        });
});

/* Create a new color palette */
router.post("/create", (req, res) => {
    let colors = req.body.colors.map(color => color.replace("#", ""));
    pool.query(`INSERT INTO color_palette (color0, color1, color2, color3, color4, date_created, num_likes)
                VALUES ('${ colors[0] }', '${ colors[1] }', '${ colors[2] }', '${ colors[3] }', '${ colors[4] }', CURRENT_TIMESTAMP(), 0)`, (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

module.exports = router;
