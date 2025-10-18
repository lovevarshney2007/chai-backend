// // require('dotenv').config({path : './env'})
// // // import dotenv from "dotenv"
// // import 'dotenv/config';

// import dotenv from "dotenv" // ✅ Sirf is import ko rakhein

// dotenv.config({
//   path: './.env'
// })

// import connectDB from "./db/index.js"
// import { app } from './app.js'

// connectDB()
// .then( () =>{
//   app.listen(process.env.PORT || 8000 , () =>{
//     console.log(`Server is running at Port : ${process.env.PORT}`);
//   })
// })
// .catch((err) =>{
//   console.log("Mongo db connection failed !! ", err)
// })

// /*
// import express from "express"
// const app = express();

// ( async () => {
//     try{
//       await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//       app.on("error" , (error) =>{
//         console.log("Error : ", error);
//         throw error
//       })

//       app.listen(process.env.PORT,()=>{
//         console.log(`app is listening on port ${process.env.PORT}`);
//       })
//     }catch (error){
//         console.error("ERROR:",error)
//     }
// })()

// */

import dotenv from "dotenv";

// Ensure environment variables are loaded immediately at startup
dotenv.config({
  path: "./.env", // Assuming the .env file is in the root directory
});

import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at Port : ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("Mongo db connection failed !! ", err);
  });
