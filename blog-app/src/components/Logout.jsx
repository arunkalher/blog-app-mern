import React,{useEffect} from 'react'
import {BrowserRouter as Router,
    Routes,
    Route,Navigate,useNavigate} from "react-router-dom"
export default function Logout() {
    const navigate=useNavigate()
    useEffect(()=>{
       
        if(localStorage.token)
        delete localStorage.token
        navigate("/")

    },[])
    return (
   
    <div>
      Hello
    </div>
  )
}
