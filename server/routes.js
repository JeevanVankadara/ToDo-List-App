const express=require("express");

const router=express.Router();

//GET /todos
router.get("/todos",(req,res)=>{
    res.status(200).json({msg:"GET request to /api/todos"});
})

//POST/todos
router.post("/todos",(req,res)=>{
    res.status(201).json({msg:"POST request to /api/todos"});
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
