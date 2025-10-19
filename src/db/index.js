import mongoose from "mongoose";    
import { DB_NAME } from "../constants.js";
import dotenv from 'dotenv';
dotenv.config();
const connectDB = async () =>{
    try{
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${mongoose.connection.host}`);

    }
    catch(error){
        console.log("Mongodb connection failed : ",error);
        process.exit(1)
    }
}



console.log("MONGODB_URI in env:", process.env.MONGODB_URI);


export default connectDB