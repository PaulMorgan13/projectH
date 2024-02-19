import react, {useState} from "react"  
import "./LoginPage.css" 
import {Link} from "react-router-dom"    
import fullLogo from "../images/fullLogo.svg"    
import SignIn from "./SignInPage" 
import SignUp from "./SignUpPage"
import axios from "axios"




const LoginPage = () => { 




    return( 
        
            <div className="l-container"> 
                
                    <div className="auth-box" >
                        <img  src={fullLogo} className="fullLogo"></img>  

                        <Link to={`/signin`} >
                        <button className="si-btn" >Sign In</button> 
                        </Link>

                        <Link to={`/signup`} >
                        <button className="su-btn">Sign Up</button> 
                        </Link>
                        <p>Terms | Private Policy | Contact Us</p>

                    
                    </div>

            </div>


    )

}  

export default LoginPage