import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongodb_url = process.env.MANGODB_URL;

const connectDB = async(req,res) =>{
    try {
        const connection = await mongoose.connect(mongodb_url);
        console.log("mongodb connected");
    return connection;
        
    } catch (error) {
        res.status(500).json({message:"MongoDB connection server error"});
    }
}
export default connectDB;