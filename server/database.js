require("dotenv").config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(uri, {
            serverApi: {
                version: '1',
                strict: true,
                deprecationErrors: true,
            }
        });
        console.log("Connected to MongoDB with Mongoose");
    } catch (error) {
        console.log(error);
    }
};

module.exports = { connectToMongoDB };
