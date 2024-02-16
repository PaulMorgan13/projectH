import React from 'react';
import {Route , BrowserRouter as Router, Routes , Navigate} from "react-router-dom"
import './App.css';  
import AddCourtPage from "./pages/AddCourtPage"
import CourtPage from "./pages/CourtPage"
import HomePage from "./pages/HomePage"   
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"   
import SignInPage from "./pages/SignInPage"  
import  SearchPage  from "./pages/SearchPage"
import Nav from "./componets/Nav"






function App() {


  return (  

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
  );
}

export default App;
