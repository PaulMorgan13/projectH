const express = require("express"); 
const mongoose = require("mongoose"); 
const cors = require("cors") 
require("dotenv").config() 
const passport = require("passport") 
const session  = require("express-session");
const LocalStrategy  = require("passport-local").Strategy; 
const bcrypt = require("bcrypt") 
const app = express()  
 


app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:"http://localhost:3000", 
    methods:"GET,POST,PUT,DELETE",
    credentials:true,
}))   


app.use(session({
    secret:"hoop",
    resave: false,
    saveUninitialized:true
}))


app.use(express.urlencoded(
    {extended:false}
)) 

app.use(express.json())  





mongoose.connect(process.env.DATABASE_URI) 
    .then(()=> console.log("connected to the Database") ) 
    .catch(error => console.log(error)) 



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



//passport.js 

app.use(passport.initialize()); 

app.use(passport.session());  

passport.serializeUser(function (user, done){
    done(null, user.id)
}) 

passport.deserializeUser((id,done)=> 
    User.findById(id, (err, user) => {
        done(err, user)
    })
)



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







passport.serializeUser(function (user, done){
    done(null, user.id)
}) 

passport.deserializeUser((id,done)=> 
    User.findById(id, (err, user) => {
        done(err, user)
    })
)



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

/*app.post('/signin',passport.authenticate('local'), async(req , res)=> {  
    console.log(req.body)
    
}); */

app.post('/signin', passport.authenticate('local'), (req, res) => { 
    console.log(req.body)
    res.json({ message: 'Login successful', user: req.user });
  });





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
        console.log(newUser) 
        newUser.save() 
    }
    catch(err){ 
        console.error("failed to sign up", err)

    }

})

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



