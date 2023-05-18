const express = require('express')
const cors = require('cors')
const { MongoClient} = require('mongodb')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;

// midleware
app.use(cors());
app.use(express.json());

const user =process.env.DB_USER
const password = process.env.DB_PASSWORD
const uri = `mongodb+srv://${user}:${password}@cluster0.nfm1t0q.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {});

app.get('/',(req,res)=>{
    res.send("Genius Car server is Running")
})
app.listen(port,()=>{
    console.log(`Genius Car Server is Running from Port ${port}`);
})