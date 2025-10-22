require("dotenv").config();
const { MongoClient,ServerApiVersion }=require("mongodb");

const uri=process.env.MONGODB_URI;

const option={
    serverApi:{
        version: ServerApiVersion.v1,
        strict:true,
        deprecationErrors:true,
    }
}

let client;

const connectToMongoDB=async()=>{
    try {
        client= await MongoClient.connect(uri, option);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
    return client;
}

const getConnectedClient=()=>client;

module.exports={connectToMongoDB,getConnectedClient};