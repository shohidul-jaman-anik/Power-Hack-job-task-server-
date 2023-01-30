const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    name: {
        required: [true, "name is required"],
        type: String
    },
    email: {
        required: [true, "Email is required"],
        type: String
    },
    password: {
        type: String,
        require: true
    },

})


module.exports = userSchema;