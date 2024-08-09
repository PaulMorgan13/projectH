import React, {useEffect , useState ,useContext} from "react" 
import axios  from "axios" 
import "./profilePage.css"  
import  "./profilePage.css" 
import Top from "../Top"
import { AuthContext } from "../../App"   
import { useParams , useNavigate } from "react-router-dom"; 



const ProfilePage = ()=>{   
    const Navigate = useNavigate()  

    const [isAuth, setIsAuth] = useContext(AuthContext)
    const [user, setUser] = useState('');
    const [loggedUser, setLoggedUser] = useState('')  
    const [editing,setIsEditing] = useState(false)


    const {id} = useParams()     



    const handleEdit = (e) => {
        setIsEditing((prevEdit) => 
            !prevEdit) 
    }

    useEffect(() =>  { 

        const checkAuth = async () => {


            try{
                const res = await axios.get(`http://localhost:3400/check-auth` , {
                    withCredentials: true,
                }) 
                 if(res.data.authenticated === true){
                     Navigate("/profile") 
                     //setLoggedUser(res.data.user.username)
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



    //this use effect will test out grabing user and for profile page better function will be made
    useEffect(() => {
        const getUser = async () => {
                
                try { 
                    const res = await axios.get(`http://localhost:3400/profile`,  {
                        withCredentials: true,
                      }) 

                      
                    console.log(res.data)
                    setLoggedUser(res.data) 
                } 

                catch(error) {
                    console.log('not able to get user', error)
                }
        }

        getUser()}, [])


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
                {
                    editing ?
                    
                    <div className="profile-card"> 
<div className="p-card-top">


    <h1 contentEditable style={{border:"1px solid black",   }}>{loggedUser && loggedUser.username ? loggedUser.username.username: "loading the User"  }.  

        <h2 contentEditable style={{border:"1px solid black"}} >{loggedUser.email ===  null ? "Email not set": loggedUser.email}</h2>
    </h1>


    <div className="pic-box"> H </div>
    <div className="pic-save" onClick={handleEdit}> </div>
</div>  

<div className="p-card-bottom"> 

    <div className="test-box" >   

        <div className="tb-1"> 
            <h1>
                My Favorite Park.
            </h1> 

            <p contentEditable  style={{border:"1px solid black"}} >{loggedUser.favoritePark === null? "Park had not been set" : loggedUser.favoritePark}</p>

        </div>

        
        <div className="tb-1"> 
            <h1>
                My City.
            </h1> 

            <p contentEditable style={{border:"1px solid black"}}>
                {loggedUser.city === null? "City not set": loggedUser.city}
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
         
                    
                    
                    :
                    <div className="profile-card"> 
                    <div className="p-card-top">


                        <h1>{loggedUser && loggedUser.username ? loggedUser.username.username: "loading the User"}.  

                            <h2>{loggedUser.email ===  null ? "Email not set": loggedUser.email}</h2>
                        </h1>


                        <div className="pic-box"> H </div>
                        <div className="pic-edit" onClick={handleEdit}> </div>
                    </div>  

                    <div className="p-card-bottom"> 

                        <div className="test-box">   

                            <div className="tb-1"> 
                                <h1>
                                    My Favorite Park.
                                </h1> 

                                <p>{loggedUser.favoritePark === null? "Park had not been set" : loggedUser.favoritePark}</p>

                            </div>

                            
                            <div className="tb-1"> 
                                <h1>
                                    My City.
                                </h1> 

                                <p>
                                    {loggedUser.city === null? "City not set": loggedUser.city}
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

       }
                
        
        
        
        </div>





    )




}  

export default ProfilePage 