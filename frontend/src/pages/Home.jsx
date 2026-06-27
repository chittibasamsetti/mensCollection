import React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useState,useEffect} from "react";
function Home(){
const [products,setProducts]=useState([]);
const navigate=useNavigate();

useEffect(()=>{
    fetchProducts()
},[]);
const fetchProducts=async ()=>{
    // const response=await axios.get("https://dummyjson.com/products");
     const response=await axios.get("http://localhost:3000/",{withCredentials:true});
    setProducts(response.data);
    
}

const deleteProduct=async(_id)=>{
    try{
        await axios.delete(`http://localhost:3000/${_id}`,{withCredentials:true});
        fetchProducts()
    }
    catch(err){
        console.log(err.response?.data);
    }
};


console.log(products);

    return(
        <>
        <div className="products">
            {products.map((product)=>( 
                <div className="product-card" key={product._id}>
                    <img src={product.image} alt={product.name}></img>
                    {/* <img src={product.thumbnail} alt={product.title}></img> */}
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <h2 className="product-price">  Rs.{product.price}</h2>
                    <div className="edit-delete">
                        <button className="edit-btn" style={{backgroundColor:"yellow"}} onClick={()=>navigate(`/editProduct/${product._id}`)}>Edit</button>
                        <button className="delete-btn"style={{backgroundColor:"red"}} onClick={()=>{deleteProduct(product._id)}}>Delete</button>
                    </div>
                    
                </div>
                

            ))}
        </div>
        </>
    )
} 

export default Home;