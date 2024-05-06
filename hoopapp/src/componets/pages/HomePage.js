import react, { useState ,useEffect, useContext } from "react" 
import axios  from "axios" 
import {Link , useNavigate} from "react-router-dom" 
import Top from "../Top" 
import "./HomePage.css"  
import bb from "../images/bb_image.png"
import { AuthContext } from "../../App"




const HomePage = (props) => { 
    const [courts , setCourts ] = useState([]) 
    const navigate = useNavigate();


    useEffect(()=> {
        const grabCourts = async () =>{
            const res = await axios.get(`http://localhost:3400/courts`)
            setCourts(res.data)  
            
        } 
        grabCourts()  
    },[])


    //const isAuth = useContext(AuthContext)  

    const [isAuth ,setIsAuth] = useContext(AuthContext)



    useEffect(() =>  { 

        const checkAuth = async () => {


            try{
                const res = await axios.get(`http://localhost:3400/check-auth` , {
                    withCredentials: true,
                })  

                if(res.data.authenticated === true){
                    navigate("/")
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




    return( 
        <div className="container" >  

          <Top/>


            <h1 className="top-heading">Top Courts</h1>
            <div className="cards">
                
                
                {  

            courts.slice(0,3).map((court)=>(
                <div className="h-card" key="_id">  

                <div className="c-top">
                <h1>
                    {court.name}
                </h1> 

                <h2>
                    {court.address}
                </h2>   
                 </div>


                <div className="c-mid">

                 <img src={bb} className="bb-image"></img> 
                 <p className="court-num">{court.courtCount} x</p> 

                    
                </div>  
              <div className="c-bottom">
                <Link to={`/courts/${court._id}`}>
                  <button className="h-read-more">More Info</button>
                </Link> 

              </div>
               
            </div>
            ))}
            </div>
        </div>

    )
    
} 


export default HomePage