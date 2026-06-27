import React from "react";
import axios from "axios";
import "./Pages.css";
import {useState,useEffect} from "react";
import {useParams} from "react-router-dom"
function EditProduct(){
    const [name,setName]=useState("");
    const [description,setDescription]=useState("");
    const [price,setPrice]=useState("");
    const [image,setImage]=useState("");
    const [error, setError]=useState("");
    const [success,setSuccess]=useState("");
    const {id}=useParams();

    useEffect(()=>{
        fetchEditingData()
    },[])

    const fetchEditingData=async()=>{
        const response=await axios.get(`http://localhost:3000/editproduct/${id}`,{withCredentials:true});
        setName(response.data.name);
        setDescription(response.data.description);
        setPrice(response.data.price);
        setImage(response.data.image);
    }

    const editProductHandler=async()=>{
       await axios.put(`http://localhost:3000/editproduct/${id}`,{name,description,price,image},{withCredentials:true});
        setSuccess("Product Edited Successfully");
    }
    return(
        <>
        
        <div className="addproduct-input">
            <h1>Edit Product</h1>
            {error ? <p className="error">{error}</p> : null}
            {success ? <p className="success">{success}</p> : null}
            <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}></input>
            <input type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}}></input>
            <input type="number" value={price} onChange={(e)=>{setPrice(e.target.value)}}></input>
            <input type="text" value={image} onChange={(e)=>{setImage(e.target.value)}}></input>
            <button onClick={editProductHandler}>EDIT</button>

        </div>
            

        </>
    )
}
export default EditProduct;