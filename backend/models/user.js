const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");


const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },

    lastName:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },

    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong");
            }
        }
    }
},{timestamps:true})

userSchema.methods.getJWT=function(){
    const user=this;
    const token=jwt.sign({_id:user._id},"secret",{expiresIn:"7d"});
    return token;
}


module.exports=mongoose.model("User",userSchema);
