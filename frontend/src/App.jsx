import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login"
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

function App(){
  return(
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/addProduct" element={<AddProduct/>}></Route>
        <Route path="/editProduct/:id" element={<EditProduct/>}></Route>

      </Routes>
    </BrowserRouter>
    </>
  )
}
export default App;






