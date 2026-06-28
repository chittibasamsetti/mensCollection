import {Link} from "react-router-dom";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import validator from "validator";
import axios from "axios";
import "./Pages.css";

function Login(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const navigate=useNavigate();

    const loginHandler=async ()=>{
         setError("");
        if(!email || !password){
        setError("Enter both email and password");
        return;
    }
    if(!validator.isEmail(email)){
        setError("Invalid email");
        return;
    }
    try{
        const response=await axios.post("http://localhost:3000/login",{email,password},{withCredentials:true});
        console.log(response.data);
       navigate("/home");
        
    }
    catch(err){
        setError(err.response?.data || "Login failed")
    }
    
    }
    return(
        <>
        <div className="login-input">
             <h1>LOGIN</h1>
             {error ? <p className="error">{error}</p> : null}
            <input type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
            <input type="password" placeholder="Enter password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
            <button className="btn" onClick={loginHandler}>login</button>
            <p>To Create Account</p>
            <Link to="/signup"><button className="btnn">Click me</button></Link>
             
        </div>
        </>
    )
}
export default Login;