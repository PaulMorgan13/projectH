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
        console.log(`adding court ${court}`)
        


        try { 
           const res =  await axios.post("http://localhost:3400/addCourt",court , {
                withCredentials:true
            })   

            if(res.status ===200 ){
                console.log("court was able to be added")

            }
            Navigate("/") 
            
        } catch (error) { 
            console.log(error, `Not able to add court`)
            
        }
      
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
                <input type="text" name="name" placeholder="Enter Park a Name" onChange={handleChange}></input>
                </div> 
                
                <div className="input-f">
                <label>Park Address</label>
                <input type="text" name="address" placeholder="Enter the Address" onChange={handleChange}></input>
                </div> 


                <div className="input-f">
                <label>Type</label>
                <input type="text" name="type" placeholder="Enter the court Type" onChange={handleChange}></input>
                </div> 


                <div className="input-f">
                <label>Floor</label>
                <input type="text" name="floor" placeholder="Enter the type of floor" onChange={handleChange}></input>
                </div> 


                <div className="input-f">
                <label>Three Point line</label>
                <input type="text" name="threePointLine" placeholder="Three Point line" onChange={handleChange}></input>
                </div> 

             
                <div className="input-f">
                <label>Rim Type</label>
                <input type="text" name="rim" placeholder="Enter Double or Single Rim" onChange={handleChange}></input>
                </div> 

                <div className="input-f">
                <label>Net Type</label>
                <input type="text" name="netType" placeholder="Enter Rope type" onChange={handleChange}></input>
                </div> 
                
                <div className="input-f">
                <label>Court Count</label>
                <input type="Number" name="courtCount" placeholder="How many courts does this Park has?" onChange={handleChange}></input>
                </div> 

                <div className="input-f">
                <label>Seats</label>
                <input type="text" name="seats" placeholder="Does this park has " onChange={handleChange}></input>

                </div>  

                </div>

                  <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>


        </div>
    )
 }


 
 export default NewCourtPage