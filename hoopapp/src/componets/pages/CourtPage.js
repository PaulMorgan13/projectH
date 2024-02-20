import React  , {useState , useEffect , useContext }from "react"; 
import axios from "axios"  
import { useParams ,useNavigate } from "react-router-dom"; 
import "./courtpage.css"
import bb from "../images/bb_image.png"
import { AuthContext } from "../../App";



const CourtPage = () => { 



    const [isAuth, setIsAuth] = useContext(AuthContext)
    const [user, setUser] = useState(null);

    const navigate = useNavigate();


    useEffect(() =>  { 

      const checkAuth = async () => {


          try{
              const res = await axios.get(`http://localhost:3400/check-auth`)
              .then((res)=>{
              console.log(res.data.isAuthenticated)
               if(res.data.isAuthenticated === false){
                   setIsAuth(false)
                   navigate("/login")
               }
               else{
                  setIsAuth(true)  
                  navigate("/search")

               }
              })
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
                    
                  { isAuthenticated ? (
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
                  ) : (navigate("/signin"))}
                </div>




        )






}  

export default CourtPage