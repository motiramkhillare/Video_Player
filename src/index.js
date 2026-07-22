import mongoose, { Mongoose } from "mongoose";
import {DB_NAME} from './cosntants.js';
import 'dotenv/config'
import connectDB from "./db/index.js";







/*
import express from "express";
const app = express();
const PORT = 8000;

( async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`) // database connection
        app.on("error",(error)=>{
            console.log(("Error",error));
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${PORT}`);
            
        })
    }catch(error){
        console.log("ERROR: ",error)
        throw error
    }

} ) ()*/