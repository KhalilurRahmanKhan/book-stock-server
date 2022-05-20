const express = require('express');
const app = express();
require('dotenv').config();


const port = process.env.PORT || 5000 ;



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://process.env.DB_USER:process.env.DB_PASSWORD@bookdb.ruoxg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  // client.close();
});


app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })