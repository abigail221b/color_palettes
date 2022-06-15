const express = require("express");
const router = express.Router();
const pool = require("../database_pool.js");

router.get("/:username/palettes", (req, res) => {
    pool.query(`SELECT *
                FROM user_creates_palette ucp LEFT JOIN color_palette p ON ucp.color0=p.color0 AND ucp.color1=p.color1 AND ucp.color2=p.color2 AND ucp.color3=p.color3 AND ucp.color4=p.color4
                WHERE username='${ req.params.username }'`,
        (err, rows) => {
            if (err) throw err;
            res.send(rows);
        });
});

router.get("/:username/palettes/likes", (req, res) => {
    pool.query(`SELECT *
                FROM user_likes_palette ulp LEFT JOIN color_palette p ON ulp.color0=p.color0 AND ulp.color1=p.color1 AND ulp.color2=p.color2 AND ulp.color3=p.color3 AND ulp.color4=p.color4
                WHERE username='${ req.params.username }'`,
        (err, rows) => {
            if (err) throw err;
            res.send(rows);
        });
});

router.put("/:username/palette/:color0/:color1/:color2/:color3/:color4/like", (req, res) => {
    pool.query(`INSERT INTO user_likes_palette
                VALUES ('${req.params.username}', '${req.params.color0}', '${req.params.color1}', '${req.params.color2}', '${req.params.color3}', '${req.params.color4}');
                UPDATE color_palette
                SET num_likes = num_likes+1
                WHERE color0='${req.params.color0}' AND color1='${req.params.color1}' AND color2='${req.params.color2}' AND color3='${req.params.color3}' AND color4='${req.params.color4}'`,
            (err, rows) => {
                if(err) throw err;
                res.send(rows);
            });
});

router.put("/:username/palette/:color0/:color1/:color2/:color3/:color4/unlike", (req, res) => {
    pool.query(`DELETE FROM user_likes_palette WHERE username='${req.params.username}' AND color0='${req.params.color0}'AND color1='${req.params.color1}'AND color2='${req.params.color2}'AND color3='${req.params.color3}'AND color4='${req.params.color4}';
                UPDATE color_palette
                SET num_likes = num_likes - 1
                WHERE color0='${req.params.color0}' AND color1='${req.params.color1}' AND color2='${req.params.color2}' AND color3='${req.params.color3}' AND color4='${req.params.color4}'`,
        (err, rows) => {
            if (err) throw err;
            res.send(rows);
        });
});

module.exports = router;
