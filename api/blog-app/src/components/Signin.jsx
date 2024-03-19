import "./Signin.css"

import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"
export default function Signin() {
  
  const [username,setusername]=useState("")
  const [password,setpassword]=useState("")
  const [errmsg,seterror]=useState("")
  const [timeout,settimeout]=useState("null")
  const navigate=useNavigate()
  return (
    <section id="login">
      <div id="error-signin">{errmsg}</div>
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
        
          let params =  {
            method: "POST",
            headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
            username,password
          })
        }
          let res= await fetch("/users/login",params)
          
         res=await res.json()
     
          if (res.status)
          {    
            navigate("/myprofile")
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
          //   let data= await fetch("/users/getuser",params)
          //   data=await data.json()
         
            
            
          }
          else{
            // seterror("Username already exists")
           
            seterror("Invalid Credentials.")
            setpassword((prev)=>"")
            setusername((prev)=>"")
        if(timeout)
            clearTimeout(timeout)
            settimeout(setTimeout(()=>seterror(""),2000))
          }
        }
        tryLogin()

        }}>Login</button>
    </section>

  )
}
