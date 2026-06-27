const jwt=require("jsonwebtoken");
const User=require("../models/user");

const userAuth=async(req,res,next)=>{
    try{
        const {token}=req.cookies;
        if(!token){
            throw new Error("Token not found");
        }

        const decodedMessage=jwt.verify(token,"secret");
        const user=await User.findById(decodedMessage._id);
        req.user=user;
        next();
    }
    catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
}

module.exports=userAuth;