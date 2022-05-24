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

router.put("/like", (req, res) => {
    pool.query(`INSERT INTO user_likes_palette
                VALUES ('${req.query.username}', '${req.query.color0}', '${req.query.color1}', '${req.query.color2}', '${req.query.color3}', '${req.query.color4}');
                UPDATE color_palette
                SET num_likes = num_likes+1
                WHERE color0='${req.query.color0}' AND color1='${req.query.color1}' AND color2='${req.query.color2}' AND color3='${req.query.color3}' AND color4='${req.query.color4}'`,
            (err, rows) => {
                if(err) throw err;
                res.send(rows);
            });
});

// !!! Todo
router.put("/unlike", (req, res) => {
    res.send("user unlike palette");
});

module.exports = router;
