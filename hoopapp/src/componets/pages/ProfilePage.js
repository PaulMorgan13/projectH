import React, {useEffect , useState ,useContext} from "react" 
import axios  from "axios" 
import { useParams ,useNavigate } from "react-router-dom"; 
import "./profilePage.css"  
import  "./profilePage.css"



const ProfilePage = ()=>{   

    return(
        <div className="container">   

                <div className="profile-card">  
                    <div className="p-card-top">


                        <h1>
                            Name.  

                            <h2>email@email.com</h2>
                        </h1>


                        <div className="pic-box"> H </div>
                    </div>  

                    <div className="p-card-bottom">

                        <div className="inner-card-b">
                            <h1>My Favorite Park.</h1> 
                            <p>demo park</p>
                        </div>  

                        <div className="inner-card-b"> 
                        <h1>My City.</h1> 
                        <p>Demo City DC</p>
                            
                        </div>  

                        <div className="inner-card-b">
                        <h1>Latest  Review</h1>
                        </div>


                    </div>



                </div>
            
        
        
        
        
        
        </div>





    )




}  

export default ProfilePage 