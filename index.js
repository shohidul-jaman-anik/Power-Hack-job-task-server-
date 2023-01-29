const express = require('express')
const app = express()
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const { restart } = require('nodemon');
const port = process.env.PORT || 5000


// middlewhare
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.3l9motx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'UnAuthorized access' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'Forbidden access' })
        }
        req.decoded = decoded;
        next();
    });
}


async function run() {
    try {
        await client.connect();

        const userCollection = client.db("billingDashboard").collection("userBilling");

        // Get All Billing data
        app.get('/billing-list ', async (req, res) => {
            const result = await userCollection.find().toArray()
            res.send(result)
        })

        // Get A Single User Data
        app.get('/allUser/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { id: ObjectId(id) }
            const result = await userCollection.findOne(filter)
            res.send(result)
        })

        // Post billing  data
        app.post('/add-billing', async (req, res) => {
            const data = req.body
            const result = userCollection.insertOne(data)
            res.send(result)
        })

        // Delete billing api
        app.delete('delete-billing/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await userCollection.deleteOne(query)
            res.send(result)
        })

        // update billing
        app.put('/update-billing/:id', async (req, res) => {
            const id = req.params.id
            console.log(id, 'hahaha')
            const data = req.body
            console.log(data)
            const query = { _id: ObjectId(id) }
            const upsert = { upsert: true }
            const updateDoc = {
                $set: data
            }
            const result = await userCollection.updateOne(query, updateDoc, upsert)
            res.send(result)
        })


    }

    finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello From Power-Hacker!')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
