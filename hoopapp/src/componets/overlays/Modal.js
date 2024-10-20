import react from "react"  
import { createPortal } from "react-dom"


const mountedElement = document.getElementById("overlays")

const modalStyle = {
    top: "35%",
    left: "45%",
    transform: `translate(-50%, -50%)`,
    position: "fixed",
    width: "400px",
    height: "400px",
    background: "grey",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)", 
    border:`solid 5px white`,
    display:`flex`
}

const Modal = ()=>{

return( 
    createPortal(<div style={modalStyle}>
        
        
        
        
        
        
        o</div>, mountedElement)

)
}  

export default Modal