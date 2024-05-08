import react  , {useState ,useEffect, useContext}from "react"; 
import axios from "axios" 
import { useNavigate  } from "react-router-dom";   
import "./addCourtPage.css"
import { AuthContext } from "../../App"  
import Top from "../Top";
   


const  NewCourtPage =() => { 
    const navigate = useNavigate();

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


    const [isAuth ,setIsAuth] = useContext(AuthContext)



    const Navigate = useNavigate() 

    const handleChange = (e)=> {
        setCourt({...court, [e.target.name]:e.target.value})
    }



    const handleSubmit = async (e) => {
        e.preventDefault() 
        await axios.post("http://localhost:3400/courts",court )  
        Navigate("/") 

    }     


    useEffect(() =>  { 

        const checkAuth = async () => {


            try{
                const res = await axios.get(`http://localhost:3400/check-auth` , {
                    withCredentials: true,
                })   
                console.log(res.data.isAuthenticated)
                 if(res.data.authenticated === true){
                     navigate("/add")
                 }  
                 else{
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

        <div className="container">
             <Top/> 

            <form className="form" onSubmit={handleSubmit}>
                <h1 >Add a Park.</h1> 

                <div className="inputBox">

                <div className="input-f">
                <label>Park Name</label>
                <input type="text" name="name" placeholder="Enter Park a Name" onClick={handleChange}></input>
                </div> 
                
                <div className="input-f">
                <label>Park Address</label>
                <input type="text" name="address" placeholder="Enter the Address" onClick={handleChange}></input>
                </div> 


                <div className="input-f">
                <label>Type</label>
                <input type="text" name="type" placeholder="Enter the court Type" onClick={handleChange}></input>
                </div> 


                <div className="input-f">
                <label>Floor</label>
                <input type="text" name="Enter the type of Floor" placeholder="Enter the type of floor" onClick={handleChange}></input>
                </div> 


                <div className="input-f">
                <label>Three Point line</label>
                <input type="text" name="Enter the type of Three Point Line" placeholder="Three Point line" onClick={handleChange}></input>
                </div> 

             
                <div className="input-f">
                <label>Rim Type</label>
                <input type="text" name="rim" placeholder="Enter Double or Single Rim" onClick={handleChange}></input>
                </div> 

                <div className="input-f">
                <label>Net Type</label>
                <input type="text" name="netType" placeholder="Enter Rope type" onClick={handleChange}></input>
                </div> 
                
                <div className="input-f">
                <label>Court Count</label>
                <input type="Number" name="courtCount" placeholder="How many courts does this Park has?" onClick={handleChange}></input>
                </div> 

                <div className="input-f">
                <label>Seats</label>
                <input type="text" name="seats" placeholder="Does this park has " onClick={handleChange}></input>

                </div>  

                </div>

                  <button type="submit">Submit</button>
            </form>


        </div>
    )
 }


 
 export default NewCourtPage