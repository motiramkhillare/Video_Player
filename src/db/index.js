import mongoose from "mongoose";
import { DB_NAME } from "../cosntants.js";

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`) // DB conntion 
        console.log(`\n MongoDB connected ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("mongo connection error", error);
        process.exit(1) 
    }
}

export default connectDB