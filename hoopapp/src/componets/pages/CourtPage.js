import React  , {useState , useEffect , useContext }from "react"; 
import axios from "axios"  
import { useParams ,useNavigate } from "react-router-dom"; 
import "./courtpage.css"
import bb from "../images/bb_image.png"
import { AuthContext } from "../../App"; 
import Top from "../Top";



const CourtPage = () => { 



    const [isAuth, setIsAuth] = useContext(AuthContext)
    const [user, setUser] = useState(null);

    const navigate = useNavigate();
    const {id} = useParams() 

    useEffect(() =>  { 

      const checkAuth = async () => {


          try{
              const res = await axios.get(`http://localhost:3400/check-auth`, {
                withCredentials: true,
              })
             
                console.log(res) 
                if(res.data.authenticated === true){
                    navigate(`/courts/${id}`)
                }
                else {
                    navigate("/login")
                }
                
          } 
          catch(err){
              console.log(`error : ${err}`)
          }

          
      }
         checkAuth()
  }, [] ) 








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


    


    useEffect(() =>{
        const grabCourt = async () => {
            const res = await axios.get(`http://localhost:3400/courts/${id}`) 
            setCourt(res.data)
        } 
        grabCourt()
    },[id])  


        return( 
                <div className="container"> 

                    <Top/>
                  
                    <div className="court-card"> 


                        <div className="court-top">  
                        <div className="court-t-l">
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
                        

                        <div className="court-t-r">
                                <div className="edit-c"></div>
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
                                    <h3  className="miles-away"> <span className="m-num">5</span>  Miles Away</h3>
                                    
                                </div>  
                                

                                <div className="recent-changes">
                                    <h3>Recent Changes: <span className="r-date">00/00/00</span></h3>
                                    
                                    <p>N/A</p>

                                </div>



                            </div>  





                            
                    </div>  
                 
                </div>




        )






}  

export default CourtPage