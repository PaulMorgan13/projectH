import react from "react"  
import { createPortal } from "react-dom"  
import closeButton from "../images/delete-button.png" 



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
    
}

const bottompStyle ={ 
    backgroundColor:`white`, 
    width:`100%`,
    height:`60%`,
    flex:"1",
    padding: "2%"
}  

const btnStyle = { 
    width:"0",
    height:"0",
    borderRadius:"50%", 
    background:"none", 
    opacity:"70%",
    position:"absolute", 
    top:"5", 
    right:"10",
    marginTop:"5px",
    marginRight:"20px"

}
const Modal = (prop)=>{

return( 
    createPortal(<div style={modalStyle}>  

            <div style={topStyle}>  
                <button style={btnStyle}><img style={{width:`20px`,height :`20px`}} src={closeButton}/></button>
                
            </div> 
            <div style={bottompStyle}>  
            <h2 style={{fontSize:"1.5em"}}>Uploader: {prop.uploader}</h2>
            <p>Image Description: {prop.imageDescription}</p>
            <p>date:{prop.date}</p>


            </div>
            
        
        
        
        
        
        
        </div>, mountedElement)

)
}  

export default Modal