const express = require('express')
const cors = require('cors')
const { MongoClient, ObjectId} = require('mongodb')
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
const client = new MongoClient(uri);
async function run(){
    try {
        const serviceCollection = client.db('geniusCar').collection('services');
        const orderCollection = client.db('geniusCar').collection('orders');
        app.get('/services', async(req,res)=>{
            const query = {}
            const cursor = serviceCollection.find(query)
            const services = await cursor.toArray()
            res.send(services);
        })
        app.get('/services/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id : new ObjectId(id)}
            const service = await serviceCollection.findOne(query);
            res.send(service)
        })
        // Order Api
        app.post('/orders',async(req,res)=>{
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        })
        
    } 
    catch (error) {
        
    }
}
run().catch(console.dir);
app.get('/',(req,res)=>{
    res.send("Genius Car server is Running")
})
app.listen(port,()=>{
    console.log(`Genius Car Server is Running from Port ${port}`);
})