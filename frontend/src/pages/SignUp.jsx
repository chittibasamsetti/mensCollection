import "./Pages.css";
import {useState} from "react";
import validator from "validator";
import axios from "axios";

function SignUp(){

    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");  
    const [email,setEmail]=useState("");  
    const [password,setPassword]=useState(""); 
    const [error, setError]=useState("");
    const [success, setSuccess]=useState("");
    
    const handleSignup= async ()=>{
         setError("");
          setSuccess("");
        if(!firstName || !lastName || !email || !password){
            setError("All fields are required");
            return;
        }
        if(!validator.isEmail(email)){
            setError("Invalid Email");
            return;
        }
        if(!validator.isStrongPassword(password)){
            setError("Please, enter strong password ");
            return;
        }
        try{
            const response=await axios.post("http://localhost:3000/signup",{firstName,lastName,email,password});
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setSuccess("Signed up successfully")
            console.log(response.data);
        }
        catch(err){
           console.log(err.message);
            setError(err.response?.data || "signup failed");
        }
                                                            
        
    }
    
    return(
        <div className="signup-input">
            <h1 style={{marginLeft:"170px"}}>SIGN UP</h1>
            
            {error ? <p className="error">{error}</p> : null}
            {success ? <p className="success">{success}</p> : null}
            <input type="text" placeholder="Enter first name" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}></input>
            <input type="text" placeholder="Enter last name" value={lastName} onChange={(e)=>{setLastName(e.target.value)}}></input>
            <input type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
            <input type="password" placeholder="Enter password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
            <button onClick={handleSignup}>SignUp</button>
            
        </div>
    )
}

export default SignUp;