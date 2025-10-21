const express=require("express");

const app=express();

const router=require("./routes");

app.use("/api", router);

app.get("/",(req,res)=>{
    res.status(200).json({msg:"hello world"});
})

const port=5000;
app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`);
});