import React,{useEffect,useState} from 'react'
import "./Editpost.css"
import {useNavigate} from "react-router-dom"
export default function Editpost(props) {
    const navigate=useNavigate()
  
    const postid=props.id.postid
   const [content,setcontent]=useState("")
   const [topic,settopic]=useState("")
   const [color,setcolor]=useState("red")
    const [error,seterror]=useState("")
   
    const [timeout,settimeout]=useState("null")
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
          let data= await fetch("/blogs/blog/"+postid)
          data=await data.json()
          data=data.data
          settopic(data.heading)
          setcontent(data.content)

          


            
     }
    }
    checktoken()
 },[navigate,postid])
  return (
    <div>

        <section id="edit-post">
        <button id="edit-post-back" onClick={()=>{
          navigate("/myprofile")
        }}>{String.fromCharCode(8592)} Back</button>
          <div id="error-edit"  style={{color:color}} >{error}</div>
         <section id="edit-topic-wrap">
           <label htmlFor="edit-topic">Topic</label>
           <input type="text"  id="edit-topic" value={topic} onChange={(e)=>{
             settopic(e.target.value)
        
           }}/>
         </section>
         <section id="edit-content-wrap">
           <label htmlFor="edit-content">Content</label>
           < textarea spellCheck={false} id="edit-content" value={content} onChange={(e)=>{
             setcontent(e.target.value)
           
           }}/>
         </section>
         <button id="update-button"  onClick={()=>{
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
         
          const tryUpdate=async ()=>{
        
            let params =  {
              method: "PATCH",
              headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              heading:topic,content
            })
          }
        let res= await fetch("/blogs/blog/"+postid,params)
            
           res=await res.json()
         
            if (res.status)
            { 
              seterror("Blog successfully Updated.")
              setcolor("green")
              if(timeout)
              clearTimeout(timeout)
              settimeout(setTimeout(()=>seterror(""),2000))
          
              
             
              
              
            }
            else{
              seterror("Error occured.")
              setcolor("red")
              if(timeout)
              clearTimeout(timeout)
              settimeout(setTimeout(()=>seterror(""),2000))
           
            }
          }
          tryUpdate()
  
         }}>Update</button>
         </section>
    </div>
  )
}
