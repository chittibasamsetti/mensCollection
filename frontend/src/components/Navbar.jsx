import React from "react";
import {Link, useLocation,useNavigate} from "react-router-dom";
import {useState,useEffect} from "react";
import axios from "axios";
import App from "../App";

import "./Navbar.css";
function Navbar({isUserLogged,setIsUserLogged}){
    const [user,setUser]=useState({});
    const location=useLocation();
    const navigate=useNavigate(); 
    const logoutBtn=async()=>{
        await axios.post("http://localhost:3000/logout",{},{withCredentials:true});
        setUser({});
        setIsUserLogged(false);
        navigate("/login");
    }
useEffect(()=>{
    fetchUser()
},[isUserLogged]);

    const fetchUser=async()=>{
        try{
            const response=await axios.get("http://localhost:3000/user",{withCredentials:true});
            setUser(response.data);
        }
        catch(err){
            console.log(err.response?.data);
        }
        
    }
    return(
        <>
        <nav className="navbar">
            <h2>MensCollection</h2>
                {isUserLogged ? <div className="welcome">Welcome...<h2 className="welcome-user">{user.firstName +" "+user.lastName}</h2></div> : null}
            

            <div className="nav-pages">
                <Link to="/home">Home</Link>
                <Link to="/addProduct">Add Product</Link>
                {location.pathname==="/signup" && (<Link to="/login">login</Link>)}
                {location.pathname==="/login" && (<Link to="/signup">sign up</Link>)}
                {location.pathname !=="/login" && location.pathname !== "/signup" && <div onClick={logoutBtn} className="loginBtn">logout</div>}
                
                

            </div>
        </nav>
        </>
    )
}
export default Navbar;
