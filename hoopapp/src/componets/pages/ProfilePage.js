import React, {useEffect , useState ,useContext} from "react" 
import axios  from "axios" 
import "./profilePage.css"  
import  "./profilePage.css" 
import Top from "../Top"



const ProfilePage = ()=>{   

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

                    
                       
                        <button className="sign-out-btn">sign out </button>

                    </div>



                    

                </div>
            
        
        
        
        
        
        </div>





    )




}  

export default ProfilePage 