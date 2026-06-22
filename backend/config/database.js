const mongoose=require("mongoose");

const connectDB=async()=>{
    await mongoose.connect(process.env.MY_CLUSTER);
}

module.exports=connectDB;