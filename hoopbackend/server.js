const express = require("express"); 
const mongoose = require("mongoose"); 
const cors = require("cors"); 
require("dotenv").config();
const session  = require("express-session");
const MongoStore = require('connect-mongo');
const passport = require("passport"); 
const LocalStrategy  = require("passport-local").Strategy; 
const bcrypt = require("bcrypt"); 
const multer = require("multer"); 
const cloudinary = require("cloudinary")
const fs = require('fs'); 
const cosineSimilarity = require("compute-cosine-similarity")
const { type } = require("os");


const app = express()  



cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.api_secret,
});



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },

}
)  

//this will handle the file type that will be uploaded  


const fileFilter = (req, file , cb) => {  
 

    // these arrays specifies what files types users can use
  const allowedExtentions = ['jpeg', 'jpg', 'png']; 
  const allowedMineTypes =  ['image/jpeg', 'image/jpg', 'image/png'];  


  //this wiil split the name from extention and then turn extention to lowercase 
  // then it will check if extention is in the allowed Extentions array
  const fileExtension = file.originalname.split('.').pop().toLowerCase();
  const isExtensionValid = allowedExtentions.includes(fileExtension);

  const isMimeTypeValid = allowedMineTypes.includes(file.mimetype);

  if (isExtensionValid && isMimeTypeValid) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only .jpg, .jpeg, and .png files are allowed!'), false); // Reject the file
  }
}


const upload = multer({
  storage:storage, 
  fileFilter:fileFilter 
}); 



app.use(cors({ origin:'http://localhost:3000', credentials: true }));



mongoose.connect(process.env.DATABASE_URI) 
    .then(()=> console.log("connected to the Database") ) 
    .catch(error => console.log(error)) 




app.use(session({ 
    secret: 'thekey',
    resave: false,
    saveUninitialized: false,
    store:MongoStore.create({mongoUrl:process.env.DATABASE_URI}),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  
}));

app.use(passport.initialize()); 
app.use(passport.session());  

app.use(express.urlencoded({ extended: true }));
app.use(express.json())  


const courtSchema = new mongoose.Schema({

    name: String, 
    type: String, 
    address: String,
    floor:String,
    rim:String, 
    netType:String, 
    threePointLine:Boolean, 
    collegeThreePointLine:Boolean, 
    courtCount: Number,
    seats:Boolean,
    likedList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

})   


const Court = mongoose.model("courts", courtSchema)  


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    } , 
    password: {
        type:String, 
        required: true
    },
    fullName:{
        type:String,
        required: true
    }, 
    number: {
        type:String, 
        required: true
    }

})


const User = mongoose.model("User", userSchema)      

//user profie schema 

const userProfileSchema = new mongoose.Schema({
    username:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        
    } , 
    email: {
        type:String, 
      
    },
    fullName:{
        type:String,
     
    }, 
    number: {
        type:String, 
        
    }, 
    city: {
        type:String, 
    }, 
    state: {
        type:String, 
       
    }, 
    favoritePark:{
        type:String, 
      
    },
    reviews:[{
        type:String,
       

    }]

})


const UserProfile = new mongoose.model("UserProfile", userProfileSchema)  

//image schema  

const imageSchema = new mongoose.Schema({
    imageUrl: {
      type: String, 
      required : true
    }, 
    user : {
      type:String, 
      required: true
    }, 
    description: {
      type: String,
      required:false
    },
    courtId:{
        type:String, 
        required:true
    },
    createdAt:{
      type:Date, 
      default:Date.now
    }

})


const Image = new mongoose.model("Image", imageSchema)    

//perks Schema 
 

const PerksSchema = new mongoose.Schema({ 
    
    perkName: {
      type: String,
      required:true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User',
      required:true
    }, 
    courtId:{
      type: String,
      required: true
    },
    createdAt:{
      type:Date, 
      default:Date.now
    }
      

})


const Perk = new mongoose.model("Perk", PerksSchema)


//passport.js 

app.use(passport.initialize()); 
app.use(passport.session());  



passport.serializeUser((user, done) => {  
        done(null, user.id);
  });

passport.deserializeUser(async (id, done) => { 
    try {  
        user = await User.findById(id); 

        if(!user) {
            return done(new Error('User not found'));
        }
        
        done(null, user)
    } catch (err) {
            done(err)
    }
    
  });



// Passport configuration
passport.use(new LocalStrategy(

    function(username, password, done) {
        User.findOne({ username: username })
          .then(user => {
            if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
            }
            // Check password here and handle accordingly 
         /*   if (user.password !== password) {
                return done(null, false, { message: 'Incorrect password.' });
              }
            
             return done(null, user); 
             
          }) */  
        
          bcrypt.compare(password, user.password) 
          .then(result => {
            if(result === false){
                return done(null, false, { message: 'Incorrect password.' });
            } 
            else {
                return done(null, user);
            }

          }) 
          
        }).catch(err => {
            return done(err);
          });
      }
  ));










//getting all the post 
app.get("/courts", async (req, res )=>{  
    const courts = await Court.find()  
    res.send(courts)
    
}) 

// getting one post

app.get("/courts/:id", async (req, res) => {
    const courts = await Court.findById(req.params.id)  
    res.send(courts)


}) 

//creating a post 
app.post("/courts", async(req, res)=>{
    const newCourt = new Court(req.body)
    const savedCourt = await newCourt.save()
    res.send(savedCourt)

}) 

app.delete("/courts/:id", async (req , res) => {
    await Court.findByIdAndDelete(req.params.id) 
    res.status(200).send("post deleted")

}) 


app.post('/signin', passport.authenticate('local'), (req, res) => {
    console.log('User:', req.user);
    res.json({ isAuthenticated: req.isAuthenticated(), user: req.user });   


  });


// will destroy the session after user logs out
app.post("/signout", async (req, res) => {
    try {
   
      req.session.destroy(); // Destroy session data
      res.clearCookie("connect.sid", {path: "/app"}); // Clear session cookie
      res.status(200).send('Logged out successfully'); //this will send the 200 status to front end code
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).send('Failed to log out'); // this will send a 500 code to the front end if there is an error
    }
  });


app.post("/signup", async(req, res)=>{ 
   // console.log(req.body)     
    const {username , password ,fullName, number } = req.body

    try{ 

        const hashedPassword = await bcrypt.hash(password , 10)

        const newUser = new User({
                username,
                password:hashedPassword,
                fullName:fullName,
                number:number
        }) 

        const newUserProfile = new  UserProfile({ 
            username: newUser.id, 
            email:null,
            fullName:fullName,
            number:number,
            city:null,
            state:null, 
            favoritePark:null, 
            reviews:null,

        })        
         
        console.log(newUser)  
        console.log(newUserProfile)
        newUser.save() 
        newUserProfile.save()
    }
    catch(err){ 
        console.error("failed to sign up", err)

    }

}) 




  
  app.get('/check-auth', (req, res) => {
    if (req.isAuthenticated()) {
      // User is authenticated
      return res.json({ authenticated: true, user: req.user });
    } else {
      // User is not authenticated
     return res.json({ authenticated: false, user: null });
    }
  });  



  app.get("/profile", async (req,res)=> {

      if(req.isAuthenticated()){
        try { 

          const userProfile = await UserProfile.findOne({username: req.user._id}).populate('username'); 
         

          if(userProfile) {
            res.send(userProfile)
          } 
          else {
              res.status(400).send({message: "user not found"})
          }
          
        } catch (error) {  
            res.status(500).send({ message: "Internal Server Error" })
          
        }

      }
      else {
        res.status(401).send({ message: "Unauthorized" });

      }
  });


/*miles away get request*/


/*
  app.get("/miles-away", async (req, res) => {


    const apiUrl = 


  }
  ) 

*/  


app.post('/upload', upload.single('image'), async (req, res) => {  
 // console.log('Session:', req.session);
 //console.log('Before Route Handler:', req.user);

  console.log(req.body)

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }


  try {
  // Upload the file to Cloudinary  
  const description = req.body.imageDescription; 
  const loggedUser = req.body.loggedInUser 
  const courtId = req.body.courtId;
  

  const result = await cloudinary.uploader.upload(req.file.path, { folder: 'uploads' });
    // Remove the file from the local storage


    await fs.unlinkSync(req.file.path);  


    const newImage = new Image({
      imageUrl: result.secure_url,
      description: description,
      user: loggedUser, 
      courtId: courtId

    });

    const savedImage = await newImage.save()    

    console.log("photo was uploaded")

    res.json({
        message: "file was able to be uploaded", 
        image:savedImage

    })
  } catch(error){ 
      console.log("Not able to upload image", error)
      res.status(500).send("Error uplooading image")
  }

 
   
  }); 

  
  app.post("/profile/updateUser", async (req,res) =>{  

      const updatedData = req.body;   

      console.log(updatedData)
      
    
    if(req.isAuthenticated()){
      try { 

        const updateUser = await UserProfile.findOneAndUpdate({username: req.user._id}, updatedData ); 
      

        if(updateUser) {
          res.send(updateUser)
        } 
        else {
            res.status(400).send({message: "user not found"})
        }
        
      } catch (error) {  
          res.status(500).send({ message: `internal server error ${updatedData}`})
      }

    }
    else {
      res.status(401).send({ message: "Unauthorized" });

    } 

    
})
 
app.post("/like", async(req, res)=> {
    const addedUser = req.user  
    const court = req.body._id
    
    console.log(court)

  try {
    
    const updatedCourt = await Court.findOneAndUpdate({_id: court}, 
     { $push: { likedList: addedUser }})    

    res.send({message: `${court}`}  ) 
    console.log(updatedCourt)
     
    if(!updatedCourt) {

      res.status(400).send({message:"court not found"})
    }
    
  } catch (error) {
        res.status(500).send({message: "not able to load"})
  }

  
}) 

app.post("/unlike",  async (req, res) => { 

      const removeUser = req.user._id
      const court = req.body._id


      try {  
            const updatedCourt = await Court.findOneAndUpdate({_id: court}, 
              {$pull: { likedList: removeUser }}, 
              { new: true }
            )  

            res.status(200).send({message: "unliked court"})  

            if(!updatedCourt) {
              res.status(404).send({message:"court not found"})
            }

      } 

      catch(err){
              res.status(500).send({message:"server error"})
      }



})

app.get("/courts/:courtId/checkLike", async (req, res) => {
      
  const user = req.user;  
  const courtParam = req.params.courtId
  
  try { 

    const court = await Court.findOne({_id: courtParam, likedList: user})   

    if (!court){
      res.status(400).send({message:`court not found`})
    } 
    else {
      res.status(200).send({message: `${user} liked that court`})
    }

  }
  catch (err){
      res.status(500).send({message: `server issue ${err}`})
  }

} ) 


app.post("/courts/:courtId/updateCourt", async (req, res)=> {
  const courtParam = req.params.courtId 

  const updatedCourt = req.body
  
  try {
      const court = await Court.findByIdAndUpdate({_id:courtParam} , updatedCourt) 

      if (!court){
        res.status(400).send({message:`court could not be found`}) 
      }
  }
  catch (err){
      res.status(500).send({message:`someing when wrong on our end`})
  }




})

/*

app.get("/recomendedCourts", async (req , res)=> {









})  

*/  


app.post("/courts/:courtId/perk", async (req, res)=> {
   const {courtId} = req.params 
   const postedUser = req.user
   const postedPerk = req.body.perkName 

  console.log(req.body.perkName)   


  if(!postedPerk){
    res.status(400).send({message: `Perk can not be empty`})
  }

  try {
        const newPerk = new Perk({
          perkName:postedPerk, 
          user: postedUser._id, 
          courtId:courtId
          })     
        
    
    await newPerk.save()
    console.log(newPerk) 
    res.status(200).send({message:"perk has been added"}) 

  } catch (error) {
      res.status(500).send({message:error})
  }
  
})

app.listen(3400 , ()=> {
    console.log("port is running on port 3400")
})  