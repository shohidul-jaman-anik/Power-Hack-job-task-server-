const mongoose = require("mongoose");


const billingSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your full name"],
    },
    email: {
        type: String,
        require:true
    },
    phone: {
        type: Number,
        minLength: [3, "Phone must be at list 11 digits"],
        maxLength: [11, "Phone is too learge"]
    },
    amount: {
        type: Number,
        min: [0, "Price can't be negative"],
        max: 100000,
    }
}, {
    tymestamps: true
})

const Billing = mongoose.model("Billing", billingSchema)

module.exports = Billing;

