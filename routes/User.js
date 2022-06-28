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

router.post("/login", (req, res) => {
    pool.query("SELECT * from user WHERE username=?", [req.body.username], (err, result) => {
        const user = result[0];
        if(result.length > 0) {
            const user = result[0];
            bcrypt.compare(req.body.password, user.password, (err, passwordMatch) => {
                if(passwordMatch) {
                    res.status(200).send({ username: user.username });
                } else {
                    res.status(401).send({ msg: "Login error" });
                }
            })
        } else {
            res.status(401).send({ msg: "Login error" });
        }
    });
});

module.exports = router;
