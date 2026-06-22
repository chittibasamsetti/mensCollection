const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
    name:{type:String,
        required:true,
        trim:true,

    },
    
    description:{type:String,
        required:true,
        trim:true,
        default:" ",
        maxlength:200
    },

    price:{type:Number,
        required:true,
    },

    image:{
        type:String,
    required:true
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }


},{timestamps:true})

module.exports=mongoose.model("Product",productSchema);
