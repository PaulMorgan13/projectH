import react, {useRef, useState, useEffect} from "react"   
import "./Top.css" 
import pIcon from "./images/ProjectH.svg" 
import { useParams ,useNavigate } from "react-router-dom";  
import demo from "./images/stock_photo.jpg"


 const  Top = ({editing, setIsEditing}) => {   

    const inputRef = useRef(null)
    const [image, setImage] = useState(null) 
    //const [avatar, setAvatar] = useState(null)


    // this will be used to get or check use has proifle photo
  /*
    useEffect(() => {
        const getAvatar = async () => {

            try {   
                console.log("getting avatar")
                const res = await axios.get('http://localhost:3400/profile/checkAvatar' , {
                    withCredentials: true
                })

                if (res.status === 200){
                    
                    if(res.data != null){
                        setAvatar(res.data) 
                        console.log('current avatar', avatar)
                    } 

                else {
                    console.log("not able to get an avatar") 
                    setAvatar([])
                }

                }
                
                
            } catch (error) { 
                console.log('not able able to get avatar', error)
                
            }


        }  

        getAvatar()


    } ,[]) 

    */

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
        backgroundImage: /* image ?  'url(${image})': "none"  */  `url(${demo})`,
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