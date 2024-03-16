
import React,{useEffect,useState} from 'react'
import {BrowserRouter as Router,
    Routes,
    Route,Navigate,useNavigate} from "react-router-dom"
import "./Myprofile.css"
import  Editprofile from './Editprofile'
export default function Myprofile(props) {
  const {userN,setuserN}=props.userparams
  const [username,setusername]=useState("")
  const [posts,setposts]=useState("1")
  const [upvotes,setupvotes]=useState("1")
  const [name,setname]=useState("1")
  const [role,setrole]=useState("1")
  const [address,setaddress]=useState("1")
  const [contact,setcontact]=useState("1")

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
           console.log(res)
          if(!res.status)
          {
             navigate("/")
          }
          else{
            
             setusername(res.username)
             let data= await fetch("http://192.168.123.67:5001/blogs"+"/"+res.username)
           
             
            

             if(data.ok)
             {  
              data=await data.json()
              data=data.data
              let upvotes=0
             
                setaddress(res.from)
                setname(res.name)
                setcontact(res.contact)
                setrole(res.role)
              
              

              let posts=data.length
                
             
              
                  for ( let post of data)
                  upvotes+=post.upvotes
                setposts(posts)
                setupvotes(upvotes)
             
             }
          }
          
     }
     else{
         navigate("/")
         
     }
    }
    checktoken()
 },[])
  return (
    <Routes>
      <Route path="/edit" element={<Editprofile/>}></Route>
      <Route path="/" element={<section id="my-profile">
      <section id="name-wrap1">
    <div id="name1">Welcome <span id="u-name1"> {username}</span></div>
    </section>
    

    <div className='post-field'>Posts : <span id="posts-">{posts}</span></div>
    <div className='post-field'>Upvotes : <span id="upvotes-">{upvotes}</span></div>
    <div className='post-field'>Name : <span id="name-">{name}</span></div>
    <div className='post-field'>Role : <span id="role-">{role}</span></div>
    <div className='post-field'>From : <span id="address-">{address}</span></div>
    <div className='post-field'>Contact here : <span id="contact-"><a href={"mailto:"+contact}>{contact}</a></span></div>
  
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
