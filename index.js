const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');


const port = process.env.PORT || 5000 ;


app.use(cors())
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@bookdb.ruoxg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true,serverApi: ServerApiVersion.v1 });




async function run(){
  try {
      await client.connect();

      const bookDB = client.db("bookDB");
      const inventory = bookDB.collection("inventory"); 



      app.get('/', async (req, res) => {
      const query = req.query;
      
      const cursor = inventory.find(query);
      
      const result = await cursor.toArray();

      res.send(result);
      });
    



      app.get('/inventory', async (req, res) => {
      const query = req.query;

      const cursor = inventory.find(query).limit(6);

      const result = await cursor.toArray();

      res.send(result);
      });



      app.get('/inventory/:id', async (req, res) => {
      let id = req.params.id;

      const cursor = inventory.find({_id:ObjectId(id)});

      
      const result = await cursor.toArray();

      res.send(result[0]);
      });


      


      app.post('/add/inventory', async (req, res) => {
        const data = req.body;

        console.log(data);
        
        const result = await inventory.insertOne(data);
        console.log(result);

        res.send(result);
      });


      app.put('/update/inventory/:id', async (req, res) => {
        const id = req.params.id;

        const filter = {_id:ObjectId(id)};

        const options = {upsert:true};


        const updateDoc = {$set:req.body}

        
        const result = await inventory.updateOne(filter,updateDoc,options);

        res.send(result);
      });



      app.delete('/delete/inventory/:id', async (req, res) => {
        const id = req.params.id;

        const filter = {_id:ObjectId(id)};
        
        const result = await inventory.deleteOne(filter);

        res.send(result);
      });
    
  
     


  } catch (e) {
      console.error(e);
  } finally {
      // await client.close();
  }
}

run().catch(console.error);



    
 

  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})