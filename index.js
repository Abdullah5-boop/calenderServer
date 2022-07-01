const express=require('express');
const app=express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors=require('cors');
app.use(cors());
app.use(express.json());
require('dotenv').config();
const port=process.env.PORT||5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q4ve3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run ()
{
    try{
        await client.connect()
        const todo = client.db('Caleder').collection('TO-DO')
        app.post('/add',async(req,res)=>{
            const data=req.body
            const date=req.body.date
         
            const result=await todo.insertOne(data)
            console.log(result)
            res.send(result)

        })
        app.get('/alltime',async(req,res)=>{
            const quarry={}
            const carsur=todo.find(quarry)
            const totask=await carsur.toArray()
            res.send(totask);

        })
        app.put('/edit',async(req,res)=>{
           const id=req.body.id;
           const content=req.body.edit;
           const filter = { _id: ObjectId(id) };
           const option = { upsert: true }
           console.log(id,content);
           const updateDoc = {
            $set: {
                content:content
            }
        }
        const result = await todo.updateOne(filter, updateDoc, option)
        console.log(result);
            res.send(result)

          

        })
        app.put('/complete',async(req,res)=>{
           const id=req.body.id;
           const content=req.body.edit;
           const filter = { _id: ObjectId(id) };
           const option = { upsert: true }
           console.log(id,content);
           const updateDoc = {
            $set: {
                status:true
            }
        }
        const result = await todo.updateOne(filter, updateDoc, option)
        console.log(result);
            res.send(result)


          

        })
        app.delete('/complete',async(req,res)=>{
            const id=req.body.id;
            const querry = { _id: ObjectId(id) };
            const result = await todo.deleteOne(querry)
            res.send(result)


        })


    }
    finally{}

}
run().catch(console.dir);




app.get('/',(req,res)=>{
    res.send("server is running")
})
app.listen(port,()=>{
    console.log('listing port ',port);
})