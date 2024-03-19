import "./Signup.css"
import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"
export default function Signup() {

  const navigate=useNavigate()
  const [username,setusername]=useState("")
  const [password,setpassword]=useState("")
  const [cpassword,setcpassword]=useState("")
  const [error,seterror]=useState("")
  const [timeout,settimeout]=useState(null)
  return (
    <section id="register">
        <section id="name-wrap-r">
          <label htmlFor="username-r">Username</label>
          <input type="text" value={username} id="username-r" onChange={(e)=>{
            setusername(e.target.value)
       
          }
          }/>
        </section>
        <section id="password-wrap-r">
          <label htmlFor="password-r">Password </label>
          <input type="password" value={password} id="password-r" onChange={(e)=>{
            setpassword(e.target.value)
          
          }
          }/>
        </section>
        <section id="password1-wrap-r">
          <label htmlFor="password1-r">Confirm Password </label>
          <input type="password" value={cpassword} id="password1-r" onChange={(e)=>{
            setcpassword(e.target.value)
          
          }
          }/>
        </section>
        <section id="err-signup">{error}</section>
        <button id="reg-button" onClick={()=>{
          if (username.length<4)
          {
            seterror("Username should be min 4 length")
            if(timeout)
        clearTimeout(timeout)
        settimeout(setTimeout(()=>seterror(""),2000))
            return
          }
          
          if (username.length>=30)
          {
            seterror("Username should be max 30 length")
            if(timeout)
        clearTimeout(timeout)
        settimeout(setTimeout(()=>seterror(""),2000))
            return
          }
         
          if (username.includes(" "))
          {
            seterror("Username should not contain whitespace")
            if(timeout)
        clearTimeout(timeout)
        settimeout(setTimeout(()=>seterror(""),2000))
            return
          }
          
        if (username.match(/^\d/))
        {
          seterror("Username should not start with a digit")
          if(timeout)
        clearTimeout(timeout)
        settimeout(setTimeout(()=>seterror(""),2000))
          return
        }
        if (password.length<6)
        {
          seterror("Password should be min 6 length")
          if(timeout)
        clearTimeout(timeout)
        settimeout(setTimeout(()=>seterror(""),2000))
          return
        }
        if (password!==cpassword)
       {
        seterror("Password and Confirm password don't match")
        if(timeout)
        clearTimeout(timeout)
        settimeout(setTimeout(()=>seterror(""),2000))
        return
       }
        
        
        const tryRgister=async ()=>{
         
          let params =  {
            method: "POST",
            headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
            username,password
          })
        }
          let res= await fetch("/users",params)
          
         res=await res.json()
       
          if (res.status)
          { 
            
            navigate("/signin")
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
            seterror("Username already exists")
            if(timeout)
            clearTimeout(timeout)
            settimeout(setTimeout(()=>seterror(""),2000))
            setcpassword((prev)=>"")
            setpassword((prev)=>"")
            setusername((prev)=>"")
       
          }
        }
        tryRgister()

        }}>Sign In</button>
    </section>
  )
}
