const express = require("express");
const router = express.Router();
const Todo = require('./models/Todo');

// GET /todos
router.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /todos
router.post("/todos", async (req, res) => {
    try {
        const {todo}=req.body;
        if(!tode){
            return res.status(400).json({mssg:"Error in finding the todo"});
        }

        todo=JSON.stringify(todo);

        const newTodo=await Todo.insertOne({todo,status:false});
        res.status(200).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /todos/:id
router.delete("/todos/:id", async (req, res) => {
    try {
        const id=req.params.id;
        const newTodo=await Todo.deleteOne({_id:id});
        res.status(200).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /todos/:id
router.put("/todos/:id", async (req, res) => {
    try {
        const id=req.params.id;
        const {status}=req.body;

        if(typeof status !=="boolean"){
            return res.status(400).json({mssg:"Error in typeof status posting"});
        }

        const newTodo=await Todo.findByIdAndUpdate(id,{$set:{status:status}},{new:true});
        res.status(200).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
