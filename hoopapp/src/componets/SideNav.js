import React from "react";
import {Link } from "react-router-dom" 
import homeIcon from "./images/home-icon.svg" 
import addIcon from "./images/add-icon.svg"
import searchIcon from "./images/search-icon.svg"  
import "./SideNav.css"



export default function SideNav () {

        return (
            <div className="sideNav"> 
                  
            <ul className="side-nav-icons">   
            
            <div className="side-box">

            <Link to={`/`} style={{ textDecoration: 'none'}}>
              <li><img className='side-i' src={homeIcon}></img> Home</li>  
            </Link>
            <Link to={`/add`} style={{textDecoration:"none"}}>
              <li><img className='side-i'   src={addIcon}></img>Add</li>  
            </Link> 
            <Link to={`/search`} style={{textDecoration:"none"}}>
              <li><img className='side-i'  src={searchIcon}></img> Search</li>  
            </Link>

            </div>

            </ul>

            
                    
            </div>

        )

}