const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const express = require("express");
const router = express.Router();
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


module.exports = router;


