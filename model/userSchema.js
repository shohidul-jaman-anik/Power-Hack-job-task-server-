const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    name: {
        required: [true, "E-mail address is required"],
        type: String
    },
    username: {
        required: [true, "E-mail address is required"],
        type: String
    },
    password: {
        type: String,
        require: true
    },

})


module.exports = userSchema;