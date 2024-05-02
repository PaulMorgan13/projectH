import react, { useState , useEffect , useContext} from "react" 
import axios  from "axios"   
import {Link ,useNavigate } from "react-router-dom"   
import "./SearchPage.css"
import search_i from "../images/search-icon-black.svg" 
import bb from "../images/bb_image.png"
import { AuthContext } from "../../App"   
import Top from "../Top"



const SearchPage =()=>{    
    const navigate = useNavigate();

    const [query, setQuery] = useState([])    
    const [search, setSearch] = useState("")    
    const [isAuth ,setIsAuth] = useContext(AuthContext)
  
    
    useEffect(() =>{
        const grabParks = async() => {
            const res = await axios.get(`http://localhost:3400/courts`)
            setQuery(res.data)  
            console.log(res)
            
        }    
        grabParks() 
        console.log(grabParks)
    },[])
 
    
    useEffect(() =>  { 

        const checkAuth = async () => {


            try{
                const res = await axios.get(`http://localhost:3400/check-auth` , {
                    withCredentials: true,
                }) 
                 if(res.data.authenticated === true){
                     navigate("/search")
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
                
                <div className="search-container">  
                        <img src={search_i} className="s-icon"  />
                    <input type="search" className="search-inp" placeholder="Explore..." onChange={(e)=> setSearch(e.target.value)}/>
                </div>    

            <div className="s-card-box">
                {query.filter((x) => {
            return search.length === 0
              ? null
              : x.name.toLocaleLowerCase().includes(search);
          }).map((x)=> (
                      <div className="s-card" key="_id">  

                      <div className="c-top">
                      <h1>
                          {x.name}
                      </h1> 

                      <h2>
                          {x.address}
                      </h2>   
                       </div>


                      <div className="c-mid">

                       <img src={bb} className="bb-image"></img> 
                       <p className="court-num">{x.courtCount} x</p> 

                          
                      </div>  
                    <div className="c-bottom">
                      <Link to={`/courts/${x._id}`}>
                        <button className="s-read-more">More Info</button>
                      </Link> 

                    </div>
                     
                  </div>
                    


                ))}
                
                </div>
            </div>

    )


} 

export default SearchPage