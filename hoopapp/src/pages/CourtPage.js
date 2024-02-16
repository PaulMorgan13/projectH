import React  , {useState , useEffect }from "react"; 
import axios from "axios"  
import { useParams } from "react-router-dom"; 
import "./courtpage.css"
import bb from "../componets/images/bb_image.png"


const CourtPage = () => {


    const [court , setCourt] = useState({
        name: "", 
        type: "", 
        address: "",
        floor:"",
        rim:"", 
        netType:"", 
        threePointLine:"", 
        collegeThreePointLine:"", 
        courtCount: "",
        seats:""

    })


    const {id} = useParams() 

    useEffect(() =>{
        const grabCourt = async () => {
            const res = await axios.get(`http://localhost:3400/courts/${id}`) 
            setCourt(res.data)
        } 
        grabCourt()
    },[id])  


        return(
                <div className="container">
                
                    <div className="court-card"> 


                        <div className="court-top"> 
                        <h1>
                        {court.name}<span className="dot">.</span>
                        </h1> 
                        <h2>
                        {court.address}
                        </h2>

                        <h2>{court.type}</h2>
                        
                        <div className="c-image"> 
                        <img src={bb}/>
                        <h3 className="c-court-num">{court.courtCount}x</h3>
                        </div>

                        
                        

                        </div>    

                          <div className="court-bottom">
                                <div className="court-more-info">
                                    <p>Court Type: {court.type}</p>
                                    <p>Court Count: {court.courtCount}</p>
                                    <p>Floor: {court.floor}</p>
                                    <p>Rim: {court.rim}</p>
                                    <p>Net Type: {court.netType}</p>
                                    <p>Three Point Line: {court.threePointLine}</p>
                                    <p>College Three Point Line: {court.collegeThreePointLine}</p>

                                </div>  

                                <div className="recent-changes">
                                    <h3>Recent Changes: <span className="r-date">00/00/00</span></h3>
                                    
                                    <p>N/A</p>

                                </div>


                                    <button className="revise-btn">Revise</button>

                            </div>  





                            
                    </div>

                </div>




        )






}  

export default CourtPage