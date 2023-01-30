const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const userSchema = require('../model/userSchema')
const User = new mongoose.model("User", userSchema);

// Registration
router.post("/registration", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,

        });
        await newUser.save()
        res.status(200).json({
            message: "Signup was successfull"
        })
    }
    catch (error){
        res.status(500).json({
            error: "Signup was not successfull"
        })
        console.log(error)
    }

})

// Login
router.post("/login", async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email })
        if (user && user.length > 0) {
            const isValidPass = await bcrypt.compare(req.body.password, user[0].password)
            if (isValidPass) {
                //generate token
                const token = jwt.sign({
                    email: user[0].email,
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


