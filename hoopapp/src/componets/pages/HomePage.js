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
                const res = await axios.get(`http://localhost:3400/check-auth`)
                .then((res)=>{
                console.log(res.data.isAuthenticated)
                 if(res.data.isAuthenticated === false){
                     setIsAuth(true)
                     navigate("/")
                 }
                 else{
                    navigate("/login")

                 }
                })
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