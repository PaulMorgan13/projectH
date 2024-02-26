const express = require("express"); 
const mongoose = require("mongoose"); 
const cors = require("cors") 
require("dotenv").config() 
const session  = require("express-session");
const MongoStore = require('connect-mongo');
const passport = require("passport") 
const LocalStrategy  = require("passport-local").Strategy; 
const bcrypt = require("bcrypt"); 

const app = express()  
 



app.use(cors({ origin: 'http://localhost:3000', credentials: true }));



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
    seats:Boolean

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
        ref: 'user'
        
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
            if (user.password !== password) {
                return done(null, false, { message: 'Incorrect password.' });
              }
            
             return done(null, user); 
             
          })
          .catch(err => {
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
    const newCourt = new Post(req.body)
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

/*
app.post('/signin', passport.authenticate('local'), (req, res) => { 
    res.json({ message: 'Login successful', user: req.user });  

  });

*/



app.post("/signup", async(req, res)=>{ 
   // console.log(req.body)     
    const {username , password ,fullName, number } = req.body

    try{ 
        const hashedPass = await bcrypt.hash(req.body.password,10)  
        console.log(hashedPass) 
        const newUser = new User({
                username,
               // password:hashedPass,
                password:password,
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
        console.log(req.user)
     return  res.json({ isAuthenticated: true, user: req.user });
    } else {
      return res.json({ isAuthenticated: false });
    }
  });

  

// Setup our admin user
/*app.get('/setup', async (req ,res) => {
	const exists = await User.exists({ username: "admin" });
    console.log("exist")
	if (exists) {
		res.redirect('/login');
		return;
	};

	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);
		bcrypt.hash("pass", salt, function (err, hash) {
			if (err) return next(err);
			
			const newAdmin = new User({
				username: "admin",
				password: hash
			});

			newAdmin.save();

			res.redirect('/login');
		});
	});
});
*/

app.listen(3400 , ()=> {
    console.log("port is running on port 3400")
}) 