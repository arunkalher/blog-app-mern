import React,{useState,useEffect} from 'react'
import "./Editprofile.css"
import {BrowserRouter as Router,
    Routes,
    Route,Navigate,useNavigate} from "react-router-dom"

export default function Editprofile(props) {
    const [name,setname]=useState("")
    const [from,setfrom]=useState("")
    const [role,setrole]=useState("")
    const [contact,setcontact]=useState("")
    const [color,setcolor]=useState("red")
    const [errmsg,seterror]=useState("")
    const [timeout,settimeout]=useState("null")
    const [username,setusername]=useState("")
    const navigate=useNavigate()
    useEffect(()=>{
       
        const checktoken=async()=>{
         const token=localStorage.token
             
         if(token)
         {
             let params =  {
                 method: "POST",
                 headers:{
                   'Content-Type':'application/json'
               },
               body:JSON.stringify({
                 token
               })
             }
               let res= await fetch("http://192.168.123.67:5001/users/checktoken",params)
               res=await res.json()
              if(!res.status)
              {
                 navigate("/")
              }
              else{
             
                 setusername(res.username)
              }
              
         }
         else{
             navigate("/")
             
         }
        }
        checktoken()
     },[])
    function EditProfile()
    {
        if ( !name || !from || !role || !contact)
        {
          seterror("Please fill all fields.")
          setcolor("red")
          if(timeout)
          clearTimeout(timeout)
          settimeout(setTimeout(()=>seterror(""),2000))
          return
        }

      async function tryUpdate(){
        let params =  {
          method: "PATCH",
          headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
          name,role,from,contact
        })
      }
        let res= await fetch("http://192.168.123.67:5001/users/update/"+username,params)
       
        res=await res.json()
       if(res.success)
       {
        seterror("Successfully Updated.")
        setcolor("green")
        if(timeout)
        clearTimeout(timeout)
        settimeout(setTimeout(()=>seterror(""),2000))
       }
       else{
        seterror("Some Error Occured.")
        setcolor("red")
        if(timeout)
        clearTimeout(timeout)
        settimeout(setTimeout(()=>seterror(""),2000))
       }  
      }
      try{
        tryUpdate()
      }
      catch
      {
        seterror("Some Error Occured.")
        setcolor("red")
        if(timeout)
        clearTimeout(timeout)
        settimeout(setTimeout(()=>seterror(""),2000))
       
      }
     

    }
  return (
    <section id="edit-details">
    <div id="error-create" style={{color:color}}>{errmsg}</div>
    <section id="name-wrap">
     <label htmlFor="name-edit" className='edit-labels'>Name</label>
     <textarea placeholder='User' type="text"  id="name-edit" value={name} onChange={(e)=>{
       setname(e.target.value)
  
     }}/>
   </section>
   <section id="from-wrap">
     <label htmlFor="from-edit" className='edit-labels'>From</label>
     <textarea placeholder='New Delhi , India'  id="from-edit" value={from} onChange={(e)=>{
       setfrom(e.target.value)
     
     }}/>
   </section> 
   <section id="role-wrap">
     <label htmlFor="role-edit" className='edit-labels'>Role</label>
     <textarea  placeholder='Softare Developer' id="role-edit" value={role} onChange={(e)=>{
       setrole(e.target.value)
     }}/>
   </section> 
   <section  id="contact-wrap">
     <label htmlFor="contact-edit" className='edit-labels'>Contact</label>
     <textarea  placeholder='abc@xyz.com' id="contact-edit" value={contact} onChange={(e)=>{
       setcontact(e.target.value)
     
     }}/>
   </section> 
   <button id="edit-submit" onClick={()=>EditProfile()}>Submit</button>
   </section>
  )
}


