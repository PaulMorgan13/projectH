import react from "react"   
import "./Top.css" 
import pIcon from "./images/ProjectH.svg" 
import { useParams ,useNavigate } from "react-router-dom"; 


 const  Top = () => {

    const navigate = useNavigate();

        return(
                <div className="top"> 
                    <img src={pIcon} className="icon"></img>  


                    <div className="user-icon" onClick={((e)=> { navigate("/profile") })}></div>

                </div>
        )



 }   

 export default Top