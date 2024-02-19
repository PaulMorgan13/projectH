import react, {useState , useEffect} from "react"
import "./SignUpPage.css" 
import {Link, useNavigate} from "react-router-dom"      
import {Route , BrowserRouter as Router, Routes} from "react-router-dom"
import fullLogo from "../images/fullLogo.svg" 
import axios from "axios"

const SignUpPage = () => {    
     
    const [username , setUsername] = useState("") 
    const [password, setPassword] = useState("")
    const [fullName , setFullName] = useState("") 
    const [number, setNumber] = useState("")     

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault() 
    
        try{    
            
            const res = await axios.post("http://localhost:3400/signup" ,{
                username, 
                password, 
                fullName,
                number
            }).then(navigate('/signin')) 
        
        }
        catch(err){
            console.error("sign up failed",err)
        }

    }


    


    return(  

        <div className="sign-up-cont">
            
            <form className="sign-up-form" action="/signup" method="post" onSubmit={handleSubmit}  >
                <h1>
                    Sign Up.
                </h1>

                <div className="input-cnt">
                <label>UserName</label>  
                <input type="text" id="usernsame" name="username"   value={username} onChange={(e)=> setUsername(e.target.value)} required/> 
                </div>  

                <div className="input-cnt">
                <label>Password</label>  
                <input type="password" id="password" name="password"   value={password} onChange={(e)=> setPassword(e.target.value)} required/> 
                </div>   
                 
                <div className="input-cnt">
                <label>Full Name</label>  
                <input type="text" id="fullname" name="fullname"   value={fullName} onChange={(e)=> setFullName(e.target.value)} required/> 
                </div>  
                <div className="input-cnt">
                <label>Number</label>  
                <input type="text" id="number" name="number"  value={number} onChange={(e)=> setNumber(e.target.value)}  required/> 
                </div>  


                <button type="submit" onClick={handleSubmit} >sign up</button>


            </form>

        </div>

    )

}  

export default SignUpPage;