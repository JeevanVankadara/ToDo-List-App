const express=require("express");

const router=express.Router();

const {getConnectedClient}=require('./database');

const getCollection=()=>{
    const client=getConnectedClient();
    const collection=client.db("todosdb").collection("todo");
    return collection;
}

//GET /todos
router.get("/todos",async (req,res)=>{
    const collection=getCollection();
    const todos=await collection.find({}).toArray();
    res.status(200).json(todos);
})

//POST/todos
router.post("/todos",async (req,res)=>{
    const collection=getCollection();
    const {todo}=req.body;

    const newTodo=await collection.insertOne({todo,status:false});
    
    res.status(201).json({todo, status:false, _id:newTodo._id});
});

//DELETE/todos
router.delete("/todos/:id",(req,res)=>{
    res.status(200).json({msg:"DELETE request to /api/todos/23"});
})

//PUT/todos
router.put("/todos/:id",(req,res)=>{
    res.status(200).json({msg:"PUT request to /api/todos/23"});
});

module.exports = router;
