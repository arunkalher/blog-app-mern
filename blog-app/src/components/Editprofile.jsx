import React,{useState,useEffect} from 'react'
import "./Editprofile.css"
import {useNavigate} from "react-router-dom"

export default function Editprofile() {
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
               let res= await fetch("/users/checktoken",params)
               res=await res.json()
              if(!res.status)
              {
                 navigate("/signin")
              }
              else{
             
                 setusername(res.username)
                 setfrom(res.user.from)
                 setname(res.user.name)
                 setcontact(res.user.contact)
                 setrole(res.user.role)
              }    
              
         }
         else{
             navigate("/")
             
         }
        }
        checktoken()
     },[navigate])
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
        let res= await fetch("/users/update/"+username,params)
       
        res=await res.json()
       if(res.status)
       {
        seterror("Successfully Updated.")
        setcolor("green")
        if(timeout)
        clearTimeout(timeout)
        settimeout(setTimeout(()=>seterror(""),2000))
        setcontact("")
        setname("")
        setfrom("")
        setrole("")
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
      <button id="edit-profile-back" onClick={()=>{
          navigate("/myprofile")
        }}>{String.fromCharCode(8592)} Back</button>
    <div id="error-create" style={{color:color}}>{errmsg}</div>
    <section id="ename-wrap">
     <label htmlFor="name-edit" className='edit-labels'>Name</label>
     <textarea spellCheck={false} placeholder='User' type="text"  id="name-edit" value={name} onChange={(e)=>{
       setname(e.target.value)
  
     }}/>
   </section>
   <section id="from-wrap">
     <label htmlFor="from-edit" className='edit-labels'>From</label>
     <textarea spellCheck={false} placeholder='New Delhi , India'  id="from-edit" value={from} onChange={(e)=>{
       setfrom(e.target.value)
     
     }}/>
   </section> 
   <section id="role-wrap">
     <label htmlFor="role-edit" className='edit-labels'>Role</label>
     <textarea  spellCheck={false} placeholder='Softare Developer' id="role-edit" value={role} onChange={(e)=>{
       setrole(e.target.value)
     }}/>
   </section> 
   <section  id="contact-wrap">
     <label htmlFor="contact-edit" className='edit-labels'>Contact</label>
     <textarea spellCheck={false}  placeholder='abc@xyz.com' id="contact-edit" value={contact} onChange={(e)=>{
       setcontact(e.target.value)
     
     }}/>
   </section> 
   <button id="edit-submit" onClick={()=>EditProfile()}>Submit</button>
   </section>
  )
}


