import react from "react"   
import "./Top.css" 
import pIcon from "./images/ProjectH.svg" 
import { useParams ,useNavigate } from "react-router-dom"; 


 const  Top = ({editing, setIsEditing}) => {  


    const style = {
        border: editing && "dashed 2px black",
        transition: ".2s ease-in"
        
    }

    const navigate = useNavigate();

        return(
                <div className="top"> 
                    <img src={pIcon} className="icon"></img>  


                    <div className="user-icon" style={style}  onClick={((e)=> { navigate("/profile") })}> 
                        {editing && <div className="add-u-photo"></div>}
                        
                    </div>

                </div>
        )



 }   

 export default Top