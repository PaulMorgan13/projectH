import React  , {useState , useEffect , useContext }from "react"; 
import axios from "axios"  
import { useParams ,useNavigate } from "react-router-dom"; 
import "./courtpage.css"
import bb from "../images/bb_image.png" 
import upload from "../images/icons8-upload-100.png"
import { AuthContext } from "../../App"; 
import Top from "../Top";



const CourtPage = () => { 



    const [isAuth, setIsAuth] = useContext(AuthContext)
    const [user, setUser] = useState(null); 
    const [toggleOn, setToggleOn] = useState(false)

    const navigate = useNavigate();
    const {id} = useParams()   


    const toggleImg = (e) => { 
        e.preventDefault() 
        setToggleOn(!toggleOn)



    } 
    const uploadImg = (e) => {
        e.preventDefault()
    }


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

    /*the use effect below will be used to get miles away*/

 
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
                                    
                                </div>  
                                

                                <div className="recent-changes">
                                    <h3>Recent Photos: <span className="r-date">00/00/00</span> <button className="btn-add-img" onClick={toggleImg} ></button></h3>  

                                    {
                                        !toggleOn ?  <p>N/A</p> : <form className="img-form"> <button className="u-btn" onClick={uploadImg}>Upload Image  <img  className="upload-icon"src={upload} /> </button> <input placeholder="image description"/>  </form>
                                    }
                                    

                                </div>



                            </div>  





                            
                    </div>  
                 
                </div>




        )






}  

export default CourtPage