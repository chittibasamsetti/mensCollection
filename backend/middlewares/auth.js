const jwt=require("jsonwebtoken");
const User=require("../models/user");

const userAuth=async(req,res,next)=>{
    try{
        const {token}=req.cookies;
        if(!token){
            throw new Error("Token not found");
        }

        const decordedMessage=jwt.verify(token,"secret");
        const user=await User.findById(decordedMessage);
        req.user=user;
        next();
    }
    catch(err){
        res.status(400).send(err.message);
    }
}

module.exports=userAuth;