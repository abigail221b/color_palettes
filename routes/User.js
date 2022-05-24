const express = require("express");
const router = express.Router();
const pool = require("../database_pool.js");

router.get("/likes", (req, res) => {
    pool.query(`SELECT *
                FROM user_likes_palette ulp LEFT JOIN color_palette p ON ulp.color0=p.color0 AND ulp.color1=p.color1 AND ulp.color2=p.color2 AND ulp.color3=p.color3 AND ulp.color4=p.color4
                WHERE username='${ req.query.username }'`,
        (err, rows) => {
            if (err) throw err;
            res.send(rows);
        });
});

// !!! Todo
router.put("/like", (req, res) => {
    res.send("user like palette");
});

// !!! Todo
router.put("/unlike", (req, res) => {
    res.send("user unlike palette");
});

module.exports = router;
