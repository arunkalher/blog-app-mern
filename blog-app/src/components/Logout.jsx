import React,{useEffect} from 'react'
import {useNavigate} from "react-router-dom"
export default function Logout() {
    const navigate=useNavigate()
    useEffect(()=>{
       
        if(localStorage.token)
        delete localStorage.token
        navigate("/")

    },[navigate])
    return (
   
    <div>
     
    </div>
  )
}
