import React  , {useState , useEffect , useContext ,  useRef}from "react"; 
import { createPortal } from "react-dom"  
import closeButton from "../images/delete-button.png" 
import axios from "axios" 
import { useParams ,useNavigate } from "react-router-dom"; 
import { AuthContext } from "../../App"; 


const mountedElement = document.getElementById("overlays")

const modalStyle = {
    top: "30%",
    left: "40%",
    transform: `translate(-50%, -50%)`,
    position: "fixed",
    width: "400px",
    height: "400px",
    background: "grey",
    margin:`5%`,
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)", 
    border:`solid 5px white`,
    display:`flex`,
    flexDirection: 'column',

}  

const topStyle ={ 
    backgroundColor:`red`, 
    width:`100%`,
    height:`60%`,
    flex:`2`,  
    padding:"5%"
    
    
    
}

const bottompStyle ={ 
    backgroundColor:`white`, 
    width:`100%`,
    height:`60%`,
    flex:"1",
    padding: "2%", 
    display:"flex",
    flexDirection:"row"
}  

const btnStyle = { 
    width:"20px",
    height:"20px",
    borderRadius:"50%", 
    background:"none", 
    //opacity:"70%", 
    background:"white",
    display:"flex", 
    justifyContent:"center", 
    alignItems:"center", 
    boxShadow: "0px 5px 17px rgba(0, 0, 0, 0.5)", 


}  

const emphasizedText = {
    fontWeight:"bold", 
    opacity: "90%"
}  

const unemphasizedText = {
    fontSize:".8em", 
    color:"##1f1f20"
} 

const h2Style = { 
    fontWeight: "lighter" ,
    fontSize:".9em", 
    textTransform: 'capitalize'

}


const Modal = (prop )=>{ 

    const removePhoto = async (e) =>{

        e.preventDefault()  

        try { 
            console.log("trash clicked"); 
            const res = await axios.post("route" ,{withCredentials: true}) 

            if(res.status === 200){
                console.log('was able to remove photo') 
                //add navagate route
            }
            else {
                console.log("was not able to remove photo", res.status)
            }
            
        } catch (error) { 
            
        }



    }

 
return( 
    createPortal(<div style={modalStyle}>  

            <div style={{ backgroundImage:`url(${prop.image})`,backgroundSize:"cover", width:`100%`,height:`60%`,flex:`2`, padding:"2%",display:"flex", justifyContent:"flex-end"}} >  
                <button style={btnStyle}><img style={{width:`20px`,height :`20px`}} src={closeButton}  onClick={prop.closeModal}/></button>
                
            </div> 
            <div style={bottompStyle}> 

            < div style={{display:"grid" ,width:"70%"}}>
            <h2 style={{fontSize:"1.5em", color:"#d46605"}}>Uploader: <span style={h2Style}>{prop.uploader}</span></h2>
            <p><span style={emphasizedText}>Image Description:</span> {prop.imageDescription}</p> 
            <p><span style={emphasizedText}>Date:</span> <span style={unemphasizedText}>{prop.date}</span></p>
            </div> 

            <div style={{display:"grid", gridTemplateColumns:"1fr auto",gridTemplateRow:"1fr auto" ,width:"30%"} }>
            <button style={{gridRow:"100", gridColumn:"2"}} onClick={removePhoto}>trash</button> 
            </div>
            </div>
            
        
        
        
        
        
        
        </div>, mountedElement)

)
}  

export default Modal