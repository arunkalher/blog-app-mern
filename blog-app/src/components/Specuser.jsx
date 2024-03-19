import React,{useEffect,useState} from 'react'
import "./Specuser.css"
import {useNavigate} from "react-router-dom"
 
export default function Specuser(props) 
{     

  const {setuserN}=props.userparams
 
  const navigate=useNavigate()
  const [name,setname]=useState("")
  const [role,setrole]=useState("")
  const [address,setaddress]=useState("")
  const [contact,setcontact]=useState("")
  const [posts,setposts]=useState("")
  const [upvotes,setupvotes]=useState("")
 
  const [shoulddisplay,setshoulddisplay]=useState(false)
  const [blogs,setblogs]=useState([])
  const username=props.username
    useEffect(()=>{
       
        const userInfo=async()=>{
           try{
               let res= await fetch("/users/"+username)
               res=await res.json()
               const user=res.user
        
              setname(user.name)
              setrole(user.role)
              setaddress(user.from)
              setcontact(user.contact)
              let data= await fetch("/blogs/"+username)
              data=await data.json()
              data=data.data
              let upvotes=0
             
              for ( let post of data)
              upvotes+=post.upvotes.length
               
              
              setupvotes(upvotes)
              setposts(data.length)
              if(data.length>0)
              {
                setshoulddisplay(true)
              }
              setblogs(data)
          }
          catch{
          
            navigate("/")
        }
        }
      userInfo()
     },[navigate,setblogs,setshoulddisplay,username])
   
    
  return (

    
   <section id="spec-user">
    <h1 id="spec-username">{username}</h1>
    <div className='post-field'>Posts : <span id="posts-spec">{posts}</span></div>
    <div className='post-field'>Upvotes : <span id="upvotes-spec">{upvotes}</span></div>
    <div className='post-field'>Name : <span id="name-spec">{name}</span></div>
    <div className='post-field'>Role : <span id="role-spec">{role}</span></div>
    <div className='post-field'>From : <span id="address-spec">{address}</span></div>
    <div className='post-field'>Contact : <span id="contact-">{contact}</span></div>
    
  
   
   
    <button id="view-posts-specuser" onClick={()=>{
      setuserN(username)
      navigate("/")
    }}>
      View Posts
    </button>
    
   </section>
  )
}
