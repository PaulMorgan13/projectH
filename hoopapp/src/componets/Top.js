import react, {useRef, useState, useEffect} from "react"   
import "./Top.css" 
import pIcon from "./images/ProjectH.svg" 
import { useParams ,useNavigate } from "react-router-dom"; 


 const  Top = ({editing, setIsEditing}) => {   

    const inputRef = useRef(null)
    const [image, setImage] = useState(null)



    const handleSelectedImg = (e) => {
        //file will be set to the event selected photo   
        //console.log(e.target.files)
        const photo = e.target.files[0];
                //if file is there or true set the imgUrl to url.createobject()  
        if(!photo){
                console.log("no photo")
        }   
        else{
            const reader = new FileReader(); 
            reader.onload = () => {
                setImage(reader.result)
            }

            reader.readAsDataURL(photo)



            
            const imgUrl = URL.createObjectURL(photo) 
            console.log("image url", imgUrl)
            console.log(image)
            setImage(imgUrl) 
            console.log(image) 
            
          
        }
       
    }   

    


    const handleClick = (e) => {
        e.preventDefault()
        console.log(`file was clicked`); 
        if(inputRef.current){
            inputRef.current.click()
        }
        
        
        //inputRef.current && inputRef.current.click() 
    }


    const style = {
        border: editing && "dashed 2px black",
        transition: ".2s ease-in", 
        backgroundImage: image ?  'url(${image})': "none",
        backgroundSize: 'cover',
        backgroundColor: "white",
        backgroundPosition: 'center',
    } 

    const imgStyle = {
            width:"100%", 
            height:"100%"
    }

    const navigate = useNavigate();

        return(
                <div className="top"> 
                    <img src={pIcon} className="icon"></img>  


                    <div className="user-icon" style={style}  onClick={((e)=> { navigate("/profile") })}>   

                    
                        
                        {editing && 
                        <>
                        <div className="add-u-photo"  onClick={handleClick} ></div> 
                        <input type="file" style={{display:"none"}}  /*style={{width:"300px" , height:"50px"}} */ ref={inputRef}  onChange={handleSelectedImg}/>
                        </>
                        
                        }
                    
                    </div>

                </div>
        )



 }   

 export default Top