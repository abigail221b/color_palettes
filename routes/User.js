const express = require("express");
const router = express.Router();
const pool = require("../database_pool.js");
const bcrypt = require("bcrypt");

router.post("/signup", (req, res) => {
    // Determine if username exists in database
    pool.query("SELECT * FROM user WHERE username=?", [req.body.username], (err, result) => {
        if(result.length > 0) {
            res.send({ msg: "Error. Username is taken."});
        }
        else {
            // salt + hash password
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                // store username and password into database
                pool.query("INSERT INTO user VALUES (?, ?)", [req.body.username, hashedPassword], (err, result) => {
                    if(err) {
                        res.send({ msg: "Not successful"});
                    } else {
                        res.send({ msg: "Successfully registered"});
                    }
                });
            });
        }
    });
});

module.exports = router;
