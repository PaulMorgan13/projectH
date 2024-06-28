import React, {useEffect , useState ,useContext} from "react" 
import axios  from "axios" 
import "./profilePage.css"  
import  "./profilePage.css" 
import Top from "../Top"
import { AuthContext } from "../../App"   
import { useNavigate  } from "react-router-dom";    



const ProfilePage = ()=>{   
    const Navigate = useNavigate()  

    const [isAuth, setIsAuth] = useContext(AuthContext)
    const [user, setUser] = useState(null);
    

    useEffect(() =>  { 

        const checkAuth = async () => {


            try{
                const res = await axios.get(`http://localhost:3400/check-auth` , {
                    withCredentials: true,
                }) 
                 if(res.data.authenticated === true){
                     Navigate("/profile")
                 }
                 else{
                    Navigate("/login")
                 }
            } 
            catch(err){
                console.log(`error : ${err}`)
            }

            
        }
           checkAuth()
    }, [] ) 





    const handleSignOut = async (e) => {    
          try{
            e.preventDefault() 
            const res = await axios.post('http://localhost:3400/signout',  {
                withCredentials: true,
              })
            
              if (res.status === 200) {
                Navigate("/login") // Redirect on successful logout   
                console.log("logout worked")
              } else {
                console.error('Logout failed:', res.statusText);
                // Handle other status codes as needed
              }
            } catch (error) {
              console.error('Error during logout:', error);
              // Handle network errors or unexpected exceptions
            }

    }


    return(
        <div className="container">   
                <Top/>
                <div className="profile-card">  
                    <div className="p-card-top">


                        <h1>
                            Name.  

                            <h2>Email@demo.com</h2>
                        </h1>


                        <div className="pic-box"> H </div>
                        <div className="pic-edit"> </div>
                    </div>  

                    <div className="p-card-bottom"> 

                        <div className="test-box">   

                            <div className="tb-1"> 
                                <h1>
                                    My Favorite Park.
                                </h1> 

                                <p>test</p>

                            </div>

                            
                            <div className="tb-1"> 
                                <h1>
                                    My City.
                                </h1> 

                                <p>
                                    The City
                                </p>

                            </div>


                            
                            <div className="tb-1"> 
                                <h1>
                                    Latest Review.
                                </h1>  

                                <h2>
                                    Park: 
                                </h2>    




                                <p>Date:</p>

                                <p>Date:</p>

                            </div>



                        

                        </div>

                    
                       
                        <button className="sign-out-btn" onClick={handleSignOut}>sign out </button>

                    </div>



                    

                </div>
            
        
        
        
        
        
        </div>





    )




}  

export default ProfilePage 