import React,{useState} from 'react'
import "./Navbar.css"
import cross  from "../images/cross3.png"
import {useNavigate} from "react-router-dom"
import home_icon from "../images/home.svg"
export default function Navbar(props) {
  const {setuserN}=props.userparams
  const {setsearchtext}=props.searchtext
  const {search,setsearch}=props.search
  function Navigate(ele) 
  {
    let _target=ele.replace(" ","")
    _target=_target.toLowerCase()
 
    
   
    navigate(_target)
  }
  const [verti,setVerti]=useState("none")
  const navigate=useNavigate()
  return (
    <>
   <nav id="nav">
      <img id ="home-icon" src={home_icon} alt="Home"  onClick={()=>{
         setuserN("")
         setsearch(!search)
         setsearchtext("")
          Navigate("/")}}/>
      <ul id="nav-items-ul">
        <li key="home" className="nav-item rem" onClick={()=>{
         setuserN("")
         setsearch(!search)
         setsearchtext("")
          Navigate("/")}}>Home</li>
       { props.list.map(ele=>{
      return <li key={ele} className="nav-item rem" onClick={()=>{
        Navigate(ele)
     
      }}>
          {ele}
          </li>
        })}
      
      <li id="menu" onClick={()=>{setVerti("flex")}}>
    
              <div className="menu-item"></div>
              <div className="menu-item"></div>
              <div className="menu-item"></div>
            
      </li>
     
      </ul>
        
     
   </nav>

<section id="verti-nav" style={{display:verti}}>
<ul id="verti-list">
  <img id="cross" src={cross} alt="cross" onClick={()=>{
    setVerti("none")
  }} />
  <li className="verti-nav-items" onClick={()=>{
    setuserN("")
        setVerti("none")
      
         setsearchtext("")
         setsearch(!search)
        navigate("/")
     
      }}>Home</li>
  {
    props.list.map(ele=>{
      return <li key={ele} className="verti-nav-items" onClick={()=>{
        setVerti("none")
        Navigate(ele)
     
      }}>
        {ele}
      </li>
    })
  }
  
  
</ul>
</section>
</>
  )
}
