const express=require("express");
const productRouter=express.Router();
const Products=require("../models/products");
const userAuth=require("../middlewares/auth");
const validateEditData=require("../validations/utils");    

productRouter.get("/",userAuth,async (req,res)=>{
    try{
        const products=await Products.find({}).sort({createdAt:-1});
        res.send(products);

    }
    catch(err){
        res.status(400).send(err.message);
    }

})


productRouter.post("/addproduct",userAuth,async (req,res)=>{
try{
    const {name,description,price,image}=req.body;

    if(!name || !description || !image || price===undefined){
        throw new Error("All fields are required");
    }
    if(price<0){
        throw new Error("Price cannot be negative");
    }
    const product=new Products({
        name,
        description,
        price,
        image,
        createdBy:req.user._id
    })
    await product.save();
    res.send(product);
}
catch(err){
    res.status(400).send(err.message);
}
})

productRouter.get("/editproduct/:id",userAuth,async(req,res)=>{
    try{
        const product=await Products.findById(req.params.id);
        if(!product){
            throw new Error("product not found");
        }
        res.json(product);
    }
    catch(err){
        res.status(400).send(err.message);
    }
    
})

productRouter.put("/editproduct/:id",userAuth, async (req,res)=>{

    try{
        const {id}=req.params;
        if(!validateEditData(req)){
            throw new Error("Edits are not allowed");
        }

        const product=await Products.findById({_id:req.params.id});
        if(!product){
            throw new Error("product not found");
        }
        Object.keys(req.body).forEach((k)=>{
            product[k]=req.body[k];
        })
        await product.save();
        res.json(product);

    }
    catch(err){
        res.status(400).send(err.message);
    }
})

productRouter.delete("/:id",userAuth, async (req,res)=>{

    try{
        const {id}=req.params;
        const product=await Products.findById({_id:req.params.id});
        if(!product){
            throw new Error("product not found");
        }

        await product.deleteOne();
        res.send("product deleted successfully");

    }
    catch(err){
        res.status(400).send(err.message);
    }

})

module.exports=productRouter;