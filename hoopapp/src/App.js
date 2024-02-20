import eact ,{createContext , useState , useEffect} from 'react';
import {Route , BrowserRouter as Router, Routes , Navigate} from "react-router-dom"
import './App.css';  
import AddCourtPage from "./componets/pages/AddCourtPage"
import CourtPage from "./componets/pages/CourtPage"
import HomePage from "./componets/pages/HomePage"   
import LoginPage from "./componets/Auth/LoginPage"
import SignUpPage from "./componets/Auth/SignUpPage"   
import SignInPage from "./componets/Auth/SignInPage"  
import  SearchPage  from "./componets/pages/SearchPage"
import Nav from "./componets/Nav"   



export const AuthContext = createContext()  




function App() {


  const [isAuth, setIsAuth] = useState(true)
   

  useEffect(()=> {
    console.log(isAuth)
  })


  /*cosnt [isAuth, setAuth ] = useState(false)
  
  useEffect(() => {
      const checkAuth = async () => {
          try{
          const res = await axios.get(`http://localhost:3400/user`)   
          console.log(res.data.user)
          setAuth(res.data.user) 
          } 
          catch(err){
          console.log(err)

          }
      } 
      checkAuth()

}, [])


*/
  return (  
      <AuthContext.Provider value={[isAuth, setIsAuth]}>
      <div className='wrapper'> 
      <Router> 
            <Routes> 
                
                
                <Route path="/signin"  element={<SignInPage/>}/> 
                <Route path="/signup"  element={<SignUpPage/>}/>
                <Route path="/login"  element={<LoginPage/>}/>
                <Route path="/"  element={<HomePage/>}/>
                <Route path="/add"  element={ <AddCourtPage/>}/> 
                <Route path="/courts/:id"  element={<CourtPage/>}/> 
                <Route path="/search"  element={<SearchPage/>}/>

            </Routes>
            <Nav/>   

      </Router> 
      </div> 
      </AuthContext.Provider>
  );
}

export default App;
