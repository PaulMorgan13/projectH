import react, {useState} from "react"  
import "./SignInPage.css" 
import {Link,useNavigate} from "react-router-dom"     
import {Route , BrowserRouter as Router, Routes} from "react-router-dom"
import fullLogo from "../images/fullLogo.svg" 

import axios from "axios"

const SignInPage = () => {     

    const [username , setUsername] = useState("") 
    const [password, setPassword] = useState("")    

    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault() 

        try{
            const res = await axios.post("http://localhost:3400/signin" ,{
                username, 
                password 
            }) 
            const {isAuthenticated, user} = res.data; 
            
            if(isAuthenticated) {
                console.log('User is authenticated:', user.username); 
                navigate("/")


           } 
           else {
            console.log( 'Login failed'); 
            navigate("/signin")
           }
             /*.then(res => {
                console.log(res)  
                if(res.status == 200){
                    navigate("/")
                }  
                else{
                    navigate("/signin")
                }
            })
             */
            
        }
        catch(err){
            console.error("login did not work",err.message)
        } 
       
    }

    return(  

        <div className="sign-in-cont">
            
            <form className="sign-in-form" action="/signin" method="post"  >
                <h1>
                    Sign In.
                </h1>

                <div className="input-cnt">
                <label>User Name</label>  
                <input type="text" id="usernsame" name="username"  value={username} onChange={(e)=> setUsername(e.target.value)} required/> 
                </div>  

                <div className="input-cnt">
                <label>Password</label>  
                <input type="password" id="password" name="password" value={password}  onChange={(e)=> setPassword(e.target.value)} required/> 
                </div>  

                <button type="submit" className="signin-btn" onClick={handleSubmit}>sign in</button> 
                <p>Forgot password?</p>
                


            </form>

        </div>

    )

}  

export default SignInPage;