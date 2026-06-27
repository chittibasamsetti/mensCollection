import React from "react";
import {Link, useLocation,useNavigate} from "react-router-dom";
import axios from "axios";

import "./Navbar.css";
function Navbar(){
    const location=useLocation();
    const navigate=useNavigate(); 
    const logoutBtn=async()=>{
        await axios.post("http://localhost:3000/logout",{},{withCredentials:true});
        navigate("/login");
    }
    return(
        <>
        <nav className="navbar">
            <h2>MensCollection</h2>
            <div className="nav-pages">
                <Link to="/">Home</Link>
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
