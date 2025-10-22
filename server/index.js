const express=require("express");
const cors=require("cors");
require("dotenv").config();
const {connectToMongoDB}=require('./database');

const app=express();

// Middleware
app.use(cors());
app.use(express.json()); 

const router=require("./routes");

app.use("/api", router);

app.get("/",(req,res)=>{
    res.status(200).json({msg:"hello world"});
})

const port=process.env.PORT || 3000;

async function startServer(){
    try {
        await connectToMongoDB();
        app.listen(port,()=>{
            console.log(`server running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();