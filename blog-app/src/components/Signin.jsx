import "./Signin.css"

import React,{useState} from 'react'
import {BrowserRouter as Router,
  Routes,
  Route,Navigate,useNavigate} from "react-router-dom"
export default function Signin(props) {
  
  const [username,setusername]=useState("")
  const [password,setpassword]=useState("")
  const navigate=useNavigate()
  return (
    <section id="login">
        <section id="name-wrap">
          <label htmlFor="username">Username</label>
          <input type="text"  id="username" value={username} onChange={(e)=>{
            setusername(e.target.value)
       
          }}/>
        </section>
        <section id="password-wrap">
          <label htmlFor="password">Password </label>
          <input type="password"  id="password" value={password} onChange={(e)=>{
            setpassword(e.target.value)
          
          }}/>
        </section>
        <button id="log-button" onClick={()=>{
         
        
        
        const tryLogin=async ()=>{
          console.log("loggin in")
          let params =  {
            method: "POST",
            headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
            username,password
          })
        }
          let res= await fetch("http://192.168.123.67:5001/users/login",params)
          
         res=await res.json()
         console.log(res)
          if (res.status)
          { 
            navigate("/")
            localStorage.token=res.token
            // navigate("/signin")
          //   const token=res.data
          //   let params =  {
          //     method: "POST",
          //     headers:{
          //       'Content-Type':'application/json'
          //   },
          //   body:JSON.stringify({
          //     token
          //   })
          // }
          //   let data= await fetch("http://192.168.123.67:5001/users/getuser",params)
          //   data=await data.json()
          //   console.log(data)
            
            
          }
          else{
            // seterror("Username already exists")
            // if(timeout)
            // clearTimeout(timeout)
            // settimeout(setTimeout(()=>seterror(""),2000))
         
            setpassword((prev)=>"")
            setusername((prev)=>"")
       
          }
        }
        tryLogin()

        }}>Login</button>
    </section>

  )
}
