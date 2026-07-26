import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import mongoose, { Mongoose } from "mongoose";
import {DB_NAME} from './constant.js';
import 'dotenv/config'
import connectDB from "./db/index.js";
import { error } from 'console';



connectDB()
.then(()=>{
        app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port: ${process.env.PORT}`);
        app.on('error',error);
        throw error
    })
})
.catch((err) =>{
    console.log("mongo db connection failed !!!",err);
    
})


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