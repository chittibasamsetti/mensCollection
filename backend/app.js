
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors=require("cors");
// const mongoose = require("mongoose");


const authRouter = require("./routes/auth");
const productRouter = require("./routes/products");

const app=express();


// app.use("/",(req,res)=>{
//     res.send("server is working on postman");

// })
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173",credentials:true}))


app.use("/",authRouter); 
app.use("/",productRouter);


connectDB().then(()=>{
    
    console.log("database connected successfully");
    app.listen(3000,()=>{
    console.log("server is running on the port 3000")
})}).catch((err)=>{
    console.log("database connection failed", err.message);
})
