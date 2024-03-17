import React,{useEffect,useState} from 'react'
import "./Specuser.css"
import {BrowserRouter as Router,
  Routes,
  Route,Navigate,useNavigate} from "react-router-dom"
  import Blog from './Blog'
export default function Specuser(props) 
{     
  console.log(props)
  const {userN,setuserN}=props.userparams
 
  const navigate=useNavigate()
  const [name,setname]=useState("")
  const [role,setrole]=useState("")
  const [address,setaddress]=useState("")
  const [contact,setcontact]=useState("")
  const [posts,setposts]=useState("")
  const [upvotes,setupvotes]=useState("")
  const [displayblogs,setdisplayblogs]=useState(false)
  const [shoulddisplay,setshoulddisplay]=useState(false)
  const [blogs,setblogs]=useState([])
  const username=props.username
    useEffect(()=>{
       
        const userInfo=async()=>{
           try{
               let res= await fetch("http://192.168.123.67:5001/users"+"/"+username)
               res=await res.json()
               const user=res.user
               console.log(user)
              setname(user.name)
              setrole(user.role)
              setaddress(user.from)
              setcontact(user.contact)
              let data= await fetch("http://192.168.123.67:5001/blogs"+"/"+username)
              data=await data.json()
              data=data.data
              let upvotes=0
             
              for ( let post of data)
              upvotes+=post.upvotes
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
     },[])
   
    
  return (

    
   <section id="spec-user">
    <h1 id="spec-username">{username}</h1>
    <div className='post-field'>Posts : <span id="posts-spec">{posts}</span></div>
    <div className='post-field'>Upvotes : <span id="upvotes-spec">{upvotes}</span></div>
    <div className='post-field'>Name : <span id="name-spec">{name}</span></div>
    <div className='post-field'>Role : <span id="role-spec">{role}</span></div>
    <div className='post-field'>From : <span id="address-spec">{address}</span></div>
    <div className='post-field'>Contact : <span id="contact-"><a href={"mailto:"+contact}>{contact}</a></span></div>
    
  
   
   
    <button id="view-posts-specuser" onClick={()=>{
      setuserN(username)
      navigate("/")
    }}>
      View Posts
    </button>
    
   </section>
  )
}
