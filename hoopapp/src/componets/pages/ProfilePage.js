import React, {useEffect , useState ,useContext} from "react" 
import axios  from "axios" 
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

                        <div className="test-box">   

                            <div className="tb-1"> 


                            </div>

                            
                            <div className="tb-1"> 


                            </div>


                            
                            <div className="tb-1"> 


                            </div>



                        

                        </div>

                    
                       
                        <button className="ep-btn">Edit Profile</button>

                    </div>



                    

                </div>
            
        
        
        
        
        
        </div>





    )




}  

export default ProfilePage 