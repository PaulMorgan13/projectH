import React from 'react'    
import "./Nav.css" 
import {Link } from "react-router-dom" 
import homeIcon from "./images/home-icon.svg" 
import addIcon from "./images/add-icon.svg"
import searchIcon from "./images/search-icon.svg"



function Nav() {
  return (
        <div className='nav-m' >  

            <ul class> 
            
            <Link to={`/`} style={{ textDecoration: 'none'}}>
              <li><img className='i' src={homeIcon}></img></li>  
            </Link>
            <Link to={`/add`} style={{textDecoration:"none"}}>
              <li><img className='i'   src={addIcon}></img></li>  
            </Link> 
            <Link to={`/search`} style={{textDecoration:"none"}}>
              <li><img className='i'  src={searchIcon}></img></li>  
            </Link>

             

            </ul>


        </div>
  )
}

export default Nav