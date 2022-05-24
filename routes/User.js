const express = require("express");
const router = express.Router();
const pool = require("../database_pool.js");

router.get("/likes", (req, res) => {
    pool.query(`SELECT *
                FROM user_likes_palette
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
