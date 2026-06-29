import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import axios from "axios";
import {useState,useEffect} from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login"
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

function App(){
  const [isUserLogged,setIsUserLogged]=useState(false);

  useEffect(()=>{
    fetchUser()
  },[])

  const fetchUser=async ()=>{
    try{
      await axios.get("http://localhost:3000/user",{withCredentials:true});
      setIsUserLogged(true);
    }
    catch(err){
      setIsUserLogged(false);
    }
    
    
  }
  return(
    <>
    <BrowserRouter>
      <Navbar isUserLogged={isUserLogged} setIsUserLogged={setIsUserLogged}/>
      <Routes>
      
        <Route path="/" element={isUserLogged ? <Home/> : <Login setIsUserLogged={setIsUserLogged}/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/login" element={<Login setIsUserLogged={setIsUserLogged}/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/addProduct" element={<AddProduct/>}></Route>
        <Route path="/editProduct/:id" element={<EditProduct/>}></Route>

      </Routes>
    </BrowserRouter>
    </>
  )
}
export default App;






