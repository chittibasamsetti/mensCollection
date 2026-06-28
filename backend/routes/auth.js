const express=require("express");
const authRouter=express.Router();
const bcrypt=require("bcrypt");
const User=require("../models/user")
const jwt=require("jsonwebtoken");
const validator=require("validator");
const userAuth=require("../middlewares/auth");


authRouter.post("/signup",async(req,res)=>{
        try{
    const {firstName,lastName,email,password}=req.body;

    if(!firstName || !lastName || !email || !password){
        throw new Error ("All fields are required");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Invalid Email");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong");
    }
    const existingUser=await User.findOne({email});
    if(existingUser){
        throw new Error("User already exist with this email");
    }

    const passwordHash=await bcrypt.hash(password,10);

    const user=new User({
        firstName,
        lastName,
        email,
        password:passwordHash});

    await user.save();
    res.send("user signed up successfully");
}
catch(err){
    // console.log(err.message);
    res.status(400).send(err.message);
}})



authRouter.post("/login",async(req,res)=>{

try{
    const {email,password}=req.body;

    if(!email ||!password){
        throw new Error("Both email and password are required");
    }

    const user=await User.findOne({email});
    if(!user){
        throw new Error("user not exist");
    }

    const isPasswordMatch=await bcrypt.compare(password,user.password);

    if(!isPasswordMatch){
        throw new Error("Incorrect Password");
    }
    const token=await user.getJWT();
    res.cookie("token",token);
    res.send(user);
     

}
catch(err){
    // console.log(err.message);
    res.status(400).send(err.message);

}
})


authRouter.get("/user",userAuth, async(req,res)=>{
    const user=req.user;
    res.send(user);
})

authRouter.post("/logout",(req,res)=>{
    // res.cookie("token",null,{expires:new Date(Date.now())});
    res.clearCookie("token");
    res.send("user logged out successfully");

})
module.exports=authRouter;