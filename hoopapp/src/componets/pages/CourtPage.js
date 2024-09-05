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
    const [checkedLike ,setCheckedLike] = useState(null)
    const [editing, setEditing] = useState(null)
    const [updatedData, setProfileData] = useState({})


    const navigate = useNavigate();
    const {id} = useParams()   
    const inputRef = useRef(null)  

    const handleFile =(e)=> {
        setImage(e.target.files[0])
    }  


    const handleInputChange = (e) => {
        const {id, innerText} = e.target  
        setProfileData((prev)=> ({
            ...prev, //this takes the prev object
            [id]:innerText //new content
        }))
        console.log(updatedData)
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


    const handleEdit = (e)=> { 
        setEditing((prev)=> !prev)

    }

    const handleEditCourt = async(e) => { 
        e.preventDefault()
            try {   

                const res = axios.post(`http://localhost:3400/courts/${id}/updateCourt` , 
                    {withCredentials:true}
                ) 
                console.log(res.data)
                
            } catch (err) {
                console.log({message: err})
            }

    }

        return( 
                <div className="container"> 

                    <Top/> 
                    { editing ?  <div className="court-card"> 


<div className="court-top">  
<div className="court-t-l">
<h1 contentEditable id="courtName" onInput={handleInputChange} suppressContentEditableWarning={true} style={{border:"1.5px solid black",  width:"350px", }}>
{court.name}<span className="dot">.</span>
</h1> 
<h2 contentEditable id="courtAddress" onInput={handleInputChange} suppressContentEditableWarning={true} style={{border:"1.5px solid black",  width:"350px", }}>
{court.address}
</h2>

<h2 contentEditable id="courtType" onInput={handleInputChange} suppressContentEditableWarning={true} style={{border:"1.5px solid black",  width:"350px", }}>{court.type}</h2>

<div className="c-image" style={{transform:`scale(80%)`, margin:`none`, alignContent:`start`}}> 
<img src={bb} />
<h3 contentEditable id="CourtCount" onInput={handleInputChange} suppressContentEditableWarning={true} style={{border:"1.5px solid black",  width:"100px", }}className="c-court-num">{court.courtCount}x</h3>
</div>

</div>


<div className="court-t-r">

        <div className="save-c" onClick={handleEdit} ></div> 

       
        
        
        
</div>

</div>    

  <div className="court-bottom">
        <div className="court-more-info">
            <p contentEditable id="courtType" onInput={handleInputChange} suppressContentEditableWarning={true} style={{border:"1.5px solid black",  width:"200px", }}>Court Type: {court.type}</p>
            <p contentEditable id="courtCount" onInput={handleInputChange} suppressContentEditableWarning={true} style={{border:"1.5px solid black",  width:"200px", }}>Court Count: {court.courtCount}</p>
            <p contentEditable id="courtFloor" onInput={handleInputChange} suppressContentEditableWarning={true} style={{border:"1.5px solid black",  width:"200px", }}>Floor: {court.floor}</p>
            <p contentEditable id="courtRim" onInput={handleInputChange} suppressContentEditableWarning={true} style={{border:"1.5px solid black",  width:"200px", }}>Rim: {court.rim}</p>
            <p contentEditable id="courtNet" onInput={handleInputChange} suppressContentEditableWarning={true} style={{border:"1.5px solid black",  width:"200px", }}>Net Type: {court.netType}</p>
            <p contentEditable id="courtThree" onInput={handleInputChange} suppressContentEditableWarning={true} style={{border:"1.5px solid black",  width:"200px", }}>Three Point Line: {court.threePointLine}</p>
            <p contentEditable id="courtCollegeThree" onInput={handleInputChange} suppressContentEditableWarning={true} style={{border:"1.5px solid black",  width:"200px", }}>College Three Point Line: {court.collegeThreePointLine}</p>
            
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
:  

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

        <div className="edit-c" onClick={handleEdit} ></div> 

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



                    }
                   
                </div>




        )






}  

export default CourtPage