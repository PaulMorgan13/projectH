import react, {useRef, useState, useEffect} from "react"   
import "./Top.css" 
import pIcon from "./images/ProjectH.svg" 
import { useParams ,useNavigate } from "react-router-dom"; 


 const  Top = ({editing, setIsEditing}) => {   

    const inputRef = useRef(null)
    const [image, setImage] = useState(null)



    const handleClick = (e) => {
        e.preventDefault()
         inputRef.current && inputRef.current.click() 
    }


    const style = {
        border: editing && "dashed 2px black",
        transition: ".2s ease-in"
        
    }

    const navigate = useNavigate();

        return(
                <div className="top"> 
                    <img src={pIcon} className="icon"></img>  


                    <div className="user-icon" style={style}  onClick={((e)=> { navigate("/profile") })}> 
                        {editing && 
                        <>
                        <div className="add-u-photo"  onClick={handleClick} ></div> 
                        <input type="file" style={{display:"none"}} ref={inputRef} onChange={(e)=>{setImage(e.target.files[0])}}/>
                        </>
                        
                        }
                    
                    </div>

                </div>
        )



 }   

 export default Top