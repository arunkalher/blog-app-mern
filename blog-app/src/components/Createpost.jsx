import React,{useEffect,useState} from 'react'
import {useNavigate} from "react-router-dom"
import "./Createpost.css"
export default function Createpost() {
    const [username,setusername]=useState("")
    const [topic,settopic]=useState("")
    const [content,setcontent]=useState("")
    const [color,setcolor]=useState("red")
    const [error,seterror]=useState("")
 
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
              let res= await fetch("/users/checktoken",params)
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
    },[navigate])
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
           <textarea  spellCheck={false} id="content" value={content} onChange={(e)=>{
             setcontent(e.target.value)
           
           }}/>
         </section>
         <button id="post-button" onClick={()=>{
           if ( topic==="")
           {
             seterror("Please give some heading.")
             setcolor("red")
             if(timeout)
             clearTimeout(timeout)
             settimeout(setTimeout(()=>seterror(""),2000))
             return
           }
          if(content==="")
          {
            seterror("Please give some content.")
              setcolor("red")
              if(timeout)
              clearTimeout(timeout)
              settimeout(setTimeout(()=>seterror(""),2000))
              return
          }
         
          const tryCreate=async ()=>{
           
            let params =  {
              method: "POST",
              headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              heading:topic,content,author:username
            })
          }
            let res= await fetch("/blogs",params)
            
           res=await res.json()
     
            if (res.status)
            { 
              seterror("Blog successfully created.")
              setcolor("green")
              setcontent("")
              settopic("")
              if(timeout)
              clearTimeout(timeout)
              settimeout(setTimeout(()=>seterror(""),2000))
           
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
            //   let data= await fetch("/users/getuser",params)
            //   data=await data.json()
          
              
              
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
