import React from "react";
import "./Pages.css";
import axios from "axios";
import validator from "validator";
import {useState} from "react";
function AddProduct(){
    const [name,setName]=useState("");
    const [description,setDescription]=useState("");
    const [price,setPrice]=useState("");
    const [image,setImage]=useState("");
    const [error, setError]=useState("");
    const [success,setSuccess]=useState("");

    const addProductHandler=async ()=>{
        setError("");
        setSuccess("");
        if(!name || !description || !image ){
            setError("All fields are required");
            return;
        }
        if(!price || Number(price)<=0){
            setError("Invalid price");
            return;
        }
        if(!validator.isURL(image)){
            setError("Invalid image URL");
            return;
        }

        try{
             const response=await axios.post("http://localhost:3000/addproduct",{name,description,price,image},{withCredentials:true});
             setName("");
             setDescription("");
             setPrice("");
             setImage("");
             setSuccess("Product Added Successfully");
             console.log(response.data);
        }
        catch(err){
            setError(err.response?.data || "adding product failed");
        }
       
        
    }
    return(
        <>
        
        <div className="addproduct-input">
            <h1>Add Product</h1>
            {error ? <p className="error">{error}</p> : null}
            {success ? <p className="success">{success}</p> : null}
            <input type="text" placeholder="Product Name" value={name} onChange={(e)=>{setName(e.target.value)}}></input>
            <input type="text" placeholder="Description" value={description} onChange={(e)=>{setDescription(e.target.value)}}></input>
            <input type="number" placeholder="Price" value={price} onChange={(e)=>{setPrice(Number(e.target.value))}}></input>
            <input type="text" placeholder="Image URL" value={image} onChange={(e)=>{setImage(e.target.value)}}></input>
            <button onClick={addProductHandler}>ADD</button>

        </div>
            

        </>
    )
}
export default AddProduct;