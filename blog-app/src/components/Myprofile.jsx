
import React,{useEffect,useState} from 'react'
import {
    Routes,
    Route,useNavigate} from "react-router-dom"
import "./Myprofile.css"
import  Editprofile from './Editprofile'
export default function Myprofile(props) {
  const {setuserN}=props.userparams
  const [username,setusername]=useState("")
  const [posts,setposts]=useState("")
  const [upvotes,setupvotes]=useState("")
  const [name,setname]=useState("")
  const [role,setrole]=useState("")
  const [address,setaddress]=useState("")
  const [contact,setcontact]=useState("")

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
             let data= await fetch("/blogs/"+res.username)
           
             
            

             if(data.ok)
             {  
              data=await data.json()
              data=data.data
              let upvotes=0
             
                setaddress(res.user.from)
                setname(res.user.name)
                setcontact(res.user.contact)
                setrole(res.user.role)
              
              

              let posts=data.length
                
             
              
                  for ( let post of data)
                  upvotes+=post.upvotes.length
                setposts(posts)
                setupvotes(upvotes)
             
             }
          }
          
     }
     else{
         navigate("/signin")
         
     }
    }
    checktoken()
 },[navigate])
  return (
    <Routes>
      <Route path="/edit" element={<Editprofile/>}></Route>
      <Route path="/" element={<section id="my-profile">
        <button id="my-profile-back" onClick={()=>{
          navigate("/")
        }}>{String.fromCharCode(8592)} Back</button>
      <section id="name-wrap1">
    <div id="name1">Welcome <span id="u-name1"> {username}</span></div>
    </section>
    

    <div className='post-field'>Posts : <span id="posts-">{posts}</span></div>
    <div className='post-field'>Upvotes : <span id="upvotes-">{upvotes}</span></div>
    <div className='post-field'>Name : <span id="name-">{name}</span></div>
    <div className='post-field'>Role : <span id="role-">{role}</span></div>
    <div className='post-field'>From : <span id="address-">{address}</span></div>
    <div className='post-field'>Contact : <span id="contact-">{contact}</span></div>
  
     <button id="edit-profile" onClick={()=>{
    
       navigate("/myprofile/edit")
     }}>Edit</button>
     <button id="my-posts" onClick={()=>{
      setuserN(username)
       navigate("/")
     }}>My Posts</button>
    </section>}></Route>
      </Routes>
    
  
  )
}
