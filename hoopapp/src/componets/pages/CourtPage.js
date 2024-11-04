import React  , {useState , useEffect , useContext ,  useRef}from "react"; 
import axios from "axios"  
import { useParams ,useNavigate } from "react-router-dom"; 
import "./courtpage.css"
import bb from "../images/bb_image.png"  
import addAlt from "../images/add-alt.png"  
import checkMark from "../images/checkmark.png"  
import checkMarkGreen from "../images/checkmarkGreen.png" 
import upload from "../images/icons8-upload-100.png"
import { AuthContext } from "../../App"; 
import Top from "../Top";
import Modal from "../overlays/Modal"



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
    const [updatedData, setCourtData] = useState({}) 
    const [addingPerk, setAddingPerk] = useState(null)   
    const [perkData, setPerkData]  = useState('')
    const [hover,setHover] = useState(null) 
    const [inputColor, setInputColor] = useState(null) 
    const [perks, setPerk] = useState([]) 
    const [courtImages, setImages] = useState([]) 
    const [imageDate,setImageDate] = useState([])
    const [showModal, setModal] = useState(false) 
    const [selectedPhoto, setSelectedPhoto] = useState([]) 
    const [isUploader, setUploader] = useState([])
    
    



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

    const handleUnlike = async (e) => { 
        e.preventDefault() 
    
        try{ 
            console.log("clicked")
            const res = await axios.post(`http://localhost:3400/unlike`,{_id: id},  {
                withCredentials: true
            })   

            if(res.status ===200){
                console.log(res.data.message) 
                setCheckedLike((prev) => 
                    !prev
                )
            } 
            else{
                console.log(`not able to unlike : ${res.status}`) 
            }
        } 
        catch(err){
            console.log(err)
        }


    }  

    const handleModal = (photo) => {
            setSelectedPhoto(photo)
            setModal(true)  

    }
    const handleCloseModal = () => { 
        console.log("click exit button")
        setModal(false)  

}

    const inputStyle = {transform:`scale(1)`, 
        border:`${inputColor ? `red 2px`: `#7da259 1.5px`}  solid` ,
        marginBottom:`0` ,
        transition:`ease-in-out 3ms`}  

   

    const handlePerkSubmit = async (e)=> {   
        e.preventDefault()   
        
        

        try {  
            if (perkData){ 
            
            const sentPerkData = {
                perkName: perkData
            }
                
            
            const res = await axios.post(`http://localhost:3400/courts/${id}/perk`, sentPerkData , {withCredentials:true}) 
            console.log(perkData) 
            setInputColor(true)
            setAddingPerk(false)  
            setPerkData("")
            

            } 
            else{
                console.log("this cannot be blank")  
                setInputColor(false)

                  
            } 

            
        } catch (error) { 
            console.log(`error:`, error)
            
        }




    } 

    
    useEffect(()=>{
        const grabCourtImages = async () => {
                
           try{ 
                console.log(`getting courts`)
                const res = await axios.get(`http://localhost:3400/courts/${id}/images`, {
                    withCredentials: true,
                  }) 
                
                 console.log(`courts have been set`) 
                 console.log(`this is the courts`,courtImages)
                  if(res.status === 200){
                  console.log(res) // comment will be removed once testing is and debugging is done
                    if(res.data.length > 0) {
                  setImages(res.data)  
                  console.log(`this is the courts`,courtImages) 
                    } 
                    else {
                        console.log(`not able to get courts`)
                        setImages([])
                    }
                  } 
            
           }
           catch(error){ 
                console.log(error , `not able to get photos`)


           }

        }

        grabCourtImages()
    }, [id])  

    

    useEffect(() => {

        const getImageDate = async () => {

            try { 
                const res = await axios.get(`http://localhost:3400/courts/${id}/recentUpload`, {withCredentials:true})
                
                if (res.status === 200){ 

                    const imageDate = res.data 
                    const date = imageDate.createdAt  
                    const formatedDate = date.substring(0,10).replaceAll("-", "/")

                    setImageDate(formatedDate)  
                    console.log(`hi`, formatedDate)
                }  
                else{
                    console.log(`no dates`)
                }

            } catch (error) { 
                console.log(error)
                
            }


        }
            getImageDate()

    }

   , [id]) 
   
        

    useEffect(() =>  { 

      const checkAuth = async () => {


          try{
              const res = await axios.get(`http://localhost:3400/check-auth`, {
                withCredentials: true,
              })
             
                console.log(res) 
                if(res.data.authenticated === true){
                    navigate(`/courts/${id}`) 
                    //setLogged(res.data.user.username)  

                    //setLogged(res.data.user._id)  
                    const userNameData = await res.data.user._id 
                    console.log(userNameData) 
                    setLogged(userNameData)
                    console.log(`user will be set to logged: ${userNameData}`)
                    
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
  }, [id] ) 



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
            const grabPerks = async () => {  

            try {
                const res = await axios.get(`http://localhost:3400/courts/${id}/perks` , {withCredentials: true}) 
                setPerk(res.data)
                
            } catch (error) {
                console.log(error, `not able to get courts`)
            }

            } 
        grabPerks()
    },[])  


    const perksList = perks.map(perk => perk.perkName).join(", ")


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


    const handleInputChange = (e) => {
        const {id, innerText} = e.target  
        setCourtData((prev)=> ({
            ...prev, //this takes the prev object
            [id]:innerText //new content
        }))
        console.log(updatedData)
    }
    
    const handleSave = async (e)=> { 
        e.preventDefault() 
        const updatedProfileData = { 
            
            courtName: updatedData.CourtName || court.name,
            courtAddress: updatedData.courtAddress || court.address,
            courtType: updatedData.courtType || court.type,
            courtCount: updatedData.courtCount || court.counCount,
            courtFloor: updatedData.courtFloor || court.floor, 
            courtRim: updatedData.courtRim || court.rim,
            courtNet: updatedData.courtNet || court.netType,
            courtThree: updatedData.courtThree || court.threePointLine,
            courtCollegeThree: updatedData.courtCollegeThree || court.collegeThreePointLine
        }; 

      
        try { 
        const res = await axios.post(`http://localhost:3400/profile/updateUser`,updatedProfileData  ,  {
            withCredentials: true,
        })  
        
        console.log(res.data) 
        handleEdit()

        } 
        catch(err){
                console.log("error:", err)
        }

    }  

    const handlePerk = (e) => {
            e.preventDefault() 
            setAddingPerk((prev) => !prev ) 
    }

    
    const uploaderMatch = ()=> {
        const currentUser = logged; 
       // const imageUploader = 

    }
    

        return( 
                <div className="container">
                     

                    <Top/>  
                    { showModal && <Modal uploader={selectedPhoto.user} date ={selectedPhoto.createdAt}  imageDescription={selectedPhoto.description} image={selectedPhoto.imageUrl}  closeModal={handleCloseModal} />}
                    { editing ?  <div className="court-card"> 

                        

<div className="court-top">  
<div className="court-t-l">
<h1 contentEditable id="courtName" onInput={handleInputChange} suppressContentEditableWarning={true} style={{border:"1.5px solid black",  width:"350px", }}>
{court.name}<span className="dot">.</span>
</h1> 
<h2 contentEditable id="courtAddress" onInput={handleInputChange} suppressContentEditableWarning={true} style={{border:"1.5px solid black",  width:"350px", }}>
{court.address}
</h2>

/*<h2 contentEditable id="courtType" onInput={handleInputChange} suppressContentEditableWarning={true} style={{border:"1.5px solid black",  width:"350px", }}>{court.type}</h2> */

<div className="c-image" style={{transform:`scale(80%)`, margin:`none`, }}> 
<img src={bb} />
<h3 contentEditable id="CourtCount" onInput={handleInputChange} suppressContentEditableWarning={true} style={{border:"1.5px solid black",  width:"100px", }}className="c-court-num">{court.courtCount}x</h3>
</div>

</div>


<div className="court-t-r">

        <div className="save-c" onClick={handleSave} ></div> 

       
        
        
        
</div>

</div>    

  <div className="court-bottom">
        <div className="court-more-info">
            <p contentEditable id="courtType" onInput={handleInputChange} suppressContentEditableWarning={true} style={{border:"1.5px solid black",  width:"200px", }}>Court Type: {court.type}</p>
            <p contentEditable id="courtCount" onInput={handleInputChange} suppressContentEditableWarning={true} style={{border:"1.5px solid black",  width:"200px", }}>Court Count: {court.courtCount}</p>
            <p contentEditable id="courtFloor" onInput={handleInputChange} suppressContentEditableWarning={true} style={{border:"1.5px solid black",  width:"200px", }}>Surface: {court.floor}</p>
            <p contentEditable id="courtRim" onInput={handleInputChange} suppressContentEditableWarning={true} style={{border:"1.5px solid black",  width:"200px", }}>Rim: {court.rim}</p>
            <p contentEditable id="courtNet" onInput={handleInputChange} suppressContentEditableWarning={true} style={{border:"1.5px solid black",  width:"200px", }}>Net Type: {court.netType}</p>
            <p contentEditable id="courtThree" onInput={handleInputChange} suppressContentEditableWarning={true} style={{border:"1.5px solid black",  width:"200px", }}>Three Point Line: {court.threePointLine}</p>
            <p contentEditable id="courtCollegeThree" onInput={handleInputChange} suppressContentEditableWarning={true} style={{border:"1.5px solid black",  width:"200px", }}>College Three Point Line: {court.collegeThreePointLine}</p>
            
        </div>  
        

        <div className="recent-changes"> 

            {/*need to find the why the image date is not working*/}
            <h3>Recent Photos: <span className="r-date">{/*imageDate.data.createdAt*/}</span> <button className="btn-add-img" onClick={toggleImg} ></button></h3>  
            
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
<img src={bb} style={{transform:`scale(80%)`, margin:`none`, }}/>
<h3 className="c-court-num">{court.courtCount}x</h3>
</div>

</div>


<div className="court-t-r">
        
       
        
        
        <div className="edit-c" onClick={handleEdit} ></div> 
        
        <div className="edit-broom" ></div> 
        {checkedLike ?  <div className="like-cg"  onClick={handleUnlike}></div> : <div className="like-c" onClick={handleLike}></div>}
        
    
</div>

</div>    

  <div className="court-bottom">
        <div className="court-more-info">
            <p>Court Type: {court.type}</p>
            <p>Court Count: {court.courtCount}</p>
            <p>Suface: {court.floor}</p>
            <p>Rim: {court.rim}</p>
            <p>Net Type: {court.netType}</p>
            <p>Three Point Line: {court.threePointLine}</p>
            <p>College Three Point Line: {court.collegeThreePointLine}</p> 
            
            { !addingPerk ?
            <p className="perks-tag">Perks:{perksList} <img className="add-alt" src={addAlt} style={{width:"10px", height:"10px"}}  onClick={handlePerk} /></p> 
                :
                <p className="perks-tag" style={{fontSize:"1.4em",fontWeight:`bold`, opacity:`80%`}}>Perks:  <input style={inputStyle}  onChange={(e)=>setPerkData(e.target.value)} /><img className="add-alt" src={hover ? checkMarkGreen : checkMark } style={{width:"13px", height:"13px"}}  onClick={handlePerkSubmit} onMouseOver={(e)=>setHover(true)} onMouseLeave={(e)=>setHover(false)}/></p> 

        }
        </div>  
        

        <div className="recent-changes">
            <h3>Recent Photos: <span className="r-date">{imageDate}</span> <button className="btn-add-img" onClick={toggleImg} ></button></h3>  

            {
                !toggleOn ?  <div className="carousell-container">    
                        {  
                        
                        courtImages && courtImages.length > 0 ?    (courtImages.map( courtImage => {
                            return ( <div key={courtImage._id} onClick={()=> {handleModal(courtImage)}} className="carousell-box"  style={{backgroundImage:`url(${courtImage.imageUrl})` , backgroundSize: `cover` ,opacity: `0.8`, cursor: `pointer` }}>  
                                    
                              </div>  )
      
                        })) :  <div className="no-photo"> 
                                <p className="no-images">No Images for this Court</p>
                                <p className="click-ub">Click the button above to upload first photo!</p>
                                </div>  
                                
                        }


                
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