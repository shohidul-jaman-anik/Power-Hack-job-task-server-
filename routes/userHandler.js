const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const userSchema = require('../model/userSchema')
const User = new mongoose.model("User", userSchema);

// SignUp
router.post("/signup", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,

        });
        await newUser.save()
        res.status(200).json({
            message: "Signup was successfull"
        })
    }
    catch {
        res.status(500).json({
            error: "Signup was not successfull"
        })
    }

})


// Login
router.post("/login", async (req, res) => {
    try {
        const user = await User.find({ username: req.body.username })
        if (user && user.length > 0) {
            const isValidPass = await bcrypt.compare(req.body.password, user[0].password)
            if (isValidPass) {
                //generate token
                const token = jwt.sign({
                    username: user[0].username,
                    userId: user[0]._id,
                }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: "1h"
                })

                res.status(200).json({
                    "access-token": token,
                    "message": "Log in successfull"
                })
            } else {
                res.status(401).json({
                    "error": "Authentication failed"
                })
            }
        } else {
            res.status(401).json({
                "error": "Authentication failed"
            })
        }
    } catch {
        res.status(401).json({
            "error": "Authentication failed"
        })
    }

})

module.exports = router;


