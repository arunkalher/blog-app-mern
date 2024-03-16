import React,{useEffect,useState} from 'react'
import {BrowserRouter as Router,
    Routes,
    Route,Navigate,useNavigate} from "react-router-dom"
import "./Createpost.css"
export default function Createpost() {
    const [username,setusername]=useState("")
    const [topic,settopic]=useState("")
    const [content,setcontent]=useState("")
    const [color,setcolor]=useState("red")
    const [error,seterror]=useState("")
    const [errordis,seterrordis]=useState("none")
    const [timeout,settimeout]=useState("null")
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
  return (
   <section id="create-post">
    <button id="create-post-back" onClick={()=>{
     navigate("/")
    }}>{String.fromCharCode(8592)} Back</button>
    
    <section id="name-wrap">
    <div id="name">Welcome <span id="u-name"> {username}</span></div>
    </section>
    
         <section id="post">
          <div id="error-create" style={{color:color}}>{error}</div>
         <section id="topic-wrap">
           <label htmlFor="topic">Topic</label>
           <input type="text"  id="topic" value={topic} onChange={(e)=>{
             settopic(e.target.value)
        
           }}/>
         </section>
         <section id="content-wrap">
           <label htmlFor="content">Content</label>
           <textarea   id="content" value={content} onChange={(e)=>{
             setcontent(e.target.value)
           
           }}/>
         </section>
         <button id="post-button" onClick={()=>{
           if ( topic=="")
           {
             seterror("Please give some heading.")
             setcolor("red")
             if(timeout)
             clearTimeout(timeout)
             settimeout(setTimeout(()=>seterror(""),2000))
             return
           }
          if(content=="")
          {
            seterror("Please give some content.")
              setcolor("red")
              if(timeout)
              clearTimeout(timeout)
              settimeout(setTimeout(()=>seterror(""),2000))
              return
          }
         
          const tryCreate=async ()=>{
            console.log("creating")
            let params =  {
              method: "POST",
              headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              heading:content,content,author:username
            })
          }
            let res= await fetch("http://192.168.123.67:5001/blogs",params)
            
           res=await res.json()
           console.log(res)
            if (res.status)
            { 
              seterror("Blog successfully created.")
              setcolor("green")
              if(timeout)
              clearTimeout(timeout)
              settimeout(setTimeout(()=>seterror(""),2000))
              console.log("success")
              // navigate("/")
              // localStorage.token=res.token
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
              seterror("Error occured.")
              setcolor("red")
              if(timeout)
              clearTimeout(timeout)
              settimeout(setTimeout(()=>seterror(""),2000))
           
              
         
            }
          }
          tryCreate()
  
         }}>Post</button>
         </section>
           
         
   </section>
  )
}
