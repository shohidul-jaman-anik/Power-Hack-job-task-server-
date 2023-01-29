const express = require('express')
const app = express()
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
// const app = require(".");
// server
const port = process.env.PORT || 5000;

// middlewhare
app.use(cors())
app.use(express.json())


//Router
const billingRoute = require('./routes/billingRoute');
const userHandler=require('./routes/userHandler')


app.use("/billing", billingRoute)
app.use("/user", userHandler)





mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Database connection successfully'))
    .catch((err) => console.log(err))



app.get('/', (req, res) => {
    res.send('Hello From Power-Hacker!')
})

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

// module.exports = app;

