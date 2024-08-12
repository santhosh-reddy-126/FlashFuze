import express from "express";
import mongoose from "mongoose";
import FlipFuze from "./data.js";
const app = express();

const port = 3008;
async function Connection(){
    try{
        const con = await mongoose.connect("mongodb+srv://nutriplan:nutriplan@cluster0.g4fpurd.mongodb.net/flipfuze?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to database");
    }catch(e){
        console.log("Error Connecting DB",e)
    }
}

Connection();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://flipfuze.onrender.com");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
app.get("/",(req,res)=>{
    res.send("<h1>hello</h1>");
})

app.post("/create",async(req,res)=>{
    try{
        const data1 = await FlipFuze.find({heading: req.body.heading});
        if(data1.length===0){
            const data2 = await FlipFuze.create({heading: req.body.heading,def: req.body.def});
        }
        res.json({success: true});
    }catch(e){
        console.log(e)
    }
})

app.post("/getall",async(req,res)=>{
    try{
        const data1 = await FlipFuze.find({heading: { $regex: req.body.search, $options: 'i' }});
        
        res.json({success: true,data: data1});
    }catch(e){
        console.log(e)
    }
})

app.post("/edit",async(req,res)=>{
    try{
        const Update1 = await FlipFuze.updateOne({
            _id: req.body.id
        },{$set: {heading: req.body.heading,def: req.body.def}});
        res.json({success: true});
    }catch(e){
        console.log(e)
    }
})

app.post("/delete",async(req,res)=>{
    try{
        const Update1 = await FlipFuze.deleteOne({
            _id: req.body.id
        });
        if (Update1.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Document not found" });
        }
        res.json({success: true});
    }catch(e){
        console.log(e)
    }
})
app.listen(port,()=>{
    console.log("Server running on port 3008")
})
