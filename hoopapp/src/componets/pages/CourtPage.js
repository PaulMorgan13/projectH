import React  , {useState , useEffect , useContext ,  useRef}from "react"; 
import axios from "axios"  
import { useParams ,useNavigate } from "react-router-dom"; 
import "./courtpage.css"
import bb from "../images/bb_image.png" 
import upload from "../images/icons8-upload-100.png"
import { AuthContext } from "../../App"; 
import Top from "../Top";



const CourtPage = () => { 



    const [isAuth, setIsAuth] = useContext(AuthContext)
    const [user, setUser] = useState(null); 
    const [toggleOn, setToggleOn] = useState(false)  
    const [imageDescription, setImageDescription] = useState("")   
    const [image , setImage] = useState(null) 
    const [imageUrl , setImageUrl] = useState("")  
    const [logged, setLogged] = useState(null) 
    const [like, setLike] = useState(false)  
    const [checkedLike ,setCheckedLike] = useState(null)




    const navigate = useNavigate();
    const {id} = useParams()   
    const inputRef = useRef(null)  

    const handleFile =(e)=> {
        setImage(e.target.files[0])
    }  

    

    const handleSubmit = async (e) => { 
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', image);
        formData.append('imagedescription', imageDescription); 
        formData.append("loggedInUser", logged); 
        formData.append("courtId", id)


        try{
            const res = await axios.post(`http://localhost:3400/upload`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })  
              setImage(null)
              setImageDescription("")
        } 
        catch(error) { 
            console.log(error) 

        }

    }

    const toggleImg = (e) => { 
        e.preventDefault() 
        setToggleOn(!toggleOn)

    } 
    const uploadImg = (e) => {
        e.preventDefault()  
       inputRef.current && inputRef.current.click()
    } 

    const handleLike = async (e) => { 
        e.preventDefault() 
    
        try{ 
            console.log("clicked")
            const res = await axios.post(`http://localhost:3400/like`,{_id: id},  {
                withCredentials: true
            })   

            if(res.status ===200){
                console.log(res.data.message) 
                setCheckedLike((prev) => 
                    !prev
                )
            } 
            else{
                console.log(`not able to like : ${res.status}`) 
            }
        } 
        catch(err){
            console.log(err)
        }


    }


    useEffect(() =>  { 

      const checkAuth = async () => {


          try{
              const res = await axios.get(`http://localhost:3400/check-auth`, {
                withCredentials: true,
              })
             
                console.log(res) 
                if(res.data.authenticated === true){
                    navigate(`/courts/${id}`) 
                    setLogged(res.data.user.username)
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

    /*the use effect below will be used to get miles away*/

 
    useEffect(() =>{
        const grabCourt = async () => {
            const res = await axios.get(`http://localhost:3400/courts/${id}`) 
            setCourt(res.data)
        } 
        grabCourt()
    },[id])  


    useEffect(()=> {
       const  checkLike = async () => { 
    
        try { 
            const res = await axios.get(`http://localhost:3400/courts/${id}/checkLike`,{
                withCredentials: true, }

            )  

            if(res.status === 200){ 
                console.log(res.status + " this is for the check like")
                setCheckedLike(true)

            }
            else if(res.status === 400){ 
                console.log(res.status)
                setCheckedLike(false)
            }
            
        } catch (err) {
            console.log({message: `${err}`})
        }
       } 

    checkLike()
    }, [id])

        return( 
                <div className="container"> 

                    <Top/>
                  
                    <div className="court-card"> 


                        <div className="court-top">  
                        <div className="court-t-l">
                        <h1>
                        {court.name}<span className="dot">.</span>
                        </h1> 
                        <h2>
                        {court.address}
                        </h2>

                        <h2>{court.type}</h2>
                        
                        <div className="c-image"> 
                        <img src={bb}/>
                        <h3 className="c-court-num">{court.courtCount}x</h3>
                        </div>

                        </div>
                        

                        <div className="court-t-r">
                        
                                <div className="edit-c" ></div> 

                                {checkedLike ?  <div className="like-cg"  onClick={handleLike}></div> : <div className="like-c" onClick={handleLike}></div>}
                                
                                
                                
                        </div>

                        </div>    

                          <div className="court-bottom">
                                <div className="court-more-info">
                                    <p>Court Type: {court.type}</p>
                                    <p>Court Count: {court.courtCount}</p>
                                    <p>Floor: {court.floor}</p>
                                    <p>Rim: {court.rim}</p>
                                    <p>Net Type: {court.netType}</p>
                                    <p>Three Point Line: {court.threePointLine}</p>
                                    <p>College Three Point Line: {court.collegeThreePointLine}</p>
                                    
                                </div>  
                                

                                <div className="recent-changes">
                                    <h3>Recent Photos: <span className="r-date">00/00/00</span> <button className="btn-add-img" onClick={toggleImg} ></button></h3>  

                                    {
                                        !toggleOn ?  <div className="carousell-container"> 
                                                <div className="carousell-box"> 

                                                </div>  

                                                <div className="carousell-box"> 

                                                </div> 
                                                 <div className="carousell-box"> 

                                                </div> 

                                                <div className="carousell-box"> 

                                                </div>
                                        
                                                    </div> 
                                        : 
                                        <form className="img-form"  onSubmit={handleSubmit} > 
                                        <button className="u-btn" onClick={uploadImg}>Upload Image  <img  className="upload-icon"src={upload} /> </button>
                                        <input placeholder="image description" id="imageDesc" value={imageDescription} onChange={(e)=>setImageDescription(e.target.value)}/> 
                                        <input type="file" style={{ display: 'none' }} ref={inputRef}  onChange={handleFile}/> 
                                        <button className="c-s-btn">Submit</button> 
                                        </form>
                                    }
                                    

                                </div>



                            </div>  

                            
                    </div>  
                 
                </div>




        )






}  

export default CourtPage