const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Marketing Ageny')

})



const uri = 'mongodb+srv://mdArif-project:ArYJB29SNsq5RaLv@cluster0.tnqyk.mongodb.net/?retryWrites=true&w=majority';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const blogCollection = client.db("digital-marketing").collection("blogs");
    
    app.get('/api/v1/blogs',async(req,res)=>{
        
        const result = await blogCollection.find().toArray()
        
        res.send({stuts:200,data:result})
    })
    app.get('/api/v1/blogs/blog/:id',async(req,res)=>{
        const id = req.params.id
        const result = await blogCollection.findOne( {_id: new ObjectId(id)})
        res.send({stuts:200,data:result})
    })
    
    
  } finally {
  }
}
run().catch(console.dir);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})