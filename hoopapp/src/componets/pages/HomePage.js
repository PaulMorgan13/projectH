import react, { useState ,useEffect } from "react" 
import axios  from "axios" 
import {Link } from "react-router-dom" 
import Top from "../Top" 
import "./HomePage.css"  
import bb from "../images/bb_image.png"



const HomePage = () => {
    const [courts , setCourts ] = useState([]) 


    useEffect(()=> {
        const grabCourts = async () =>{
            const res = await axios.get(`http://localhost:3400/courts`)
            setCourts(res.data)  
            
        } 
        grabCourts()  
    },[])

    return( 
        <div className="container" >  

          <Top/>


            <h1 className="top-heading">Top Courts</h1>
            <div className="cards">
                
                
                {  

            courts.slice(0,3).map((court)=>(
                    <div className="card" key="_id">
                        <h1>
                            {court.name}
                        </h1> 

                        <h2>
                            {court.address}
                        </h2>   

                        <div className="court-type">

                         <img src={bb} className="bb-image"></img> 
                         
                         
                         <p className="court-num">{court.courtCount} x</p> 

                        <Link to={`/courts/${court._id}`}>
                          <button className="read-more">More Info</button>
                        </Link>
                       
                            
                        </div>  
                    
                    </div>
            ))}
            </div>
        </div>

    )
    
} 


export default HomePage