import React,{useContext, useEffect,useState} from 'react'
import Contextblog from '../contexts/Contextblog'
import upvote from "../images/empty_like.jpg"
import upvote_filled from "../images/filled_like.jpg"
import "./Specificblog.css"
import {BrowserRouter as Router,
  Routes,
  Route,Navigate,useNavigate} from "react-router-dom"
export default function Specificblog(props) {
  const navigate=useNavigate()
  const {setspecuser,setspecusername}=props.spec
  const [filled,setfilled]=useState(props.data.filled)

  useEffect(()=>{window.scrollTo(0,0)
  console.log("specified blogt")
  
  },[])
  console.log(props.data)
  let {heading,author,date,content,upvotes,newupvotes,minRead,_id}=props.data
  const [Upvotes,setUpvotes]=useState(newupvotes)
  function likeClicked()
    {   
        // console.log(username)
        let state=filled
        async function checkToken()
        {
          let username=""
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
         
               if(res.status)
               {
                  username=res.username
                  
                  
               }
               else{
                navigate("/signin")
               }
               
          }

          else{
            navigate("/signin")
          }
        
          

                if(!state)
                {   
                  let newarray=upvotes
                  if(!upvotes.includes(username))
                  newarray=[...upvotes,username]
                    let params =  {
                        method: "PATCH",
                        headers:{
                          'Content-Type':'application/json'
                      },
                      body:JSON.stringify({
                        upvotes:newarray
                      })
                    }
                  let res= await fetch("http://192.168.123.67:5001/blogs/blog/"+_id,params)
                      
                     res=await res.json()
                   console.log(res)

                  
                   
                    

                }
                else{
                    let newarray=upvotes.filter((ele)=>ele!==username)
                    let params =  {
                        method: "PATCH",
                        headers:{
                          'Content-Type':'application/json'
                      },
                      body:JSON.stringify({
                        upvotes:newarray
                      })
                    }
                  let res= await fetch("http://192.168.123.67:5001/blogs/blog/"+_id,params)
                      
                     res=await res.json()
                   console.log(res)

                }
    
    }
    if(filled)
    {
      setUpvotes(Upvotes-1)
    }
   
else
{
  setUpvotes(Upvotes+1)
  
}

    setfilled(!filled)
   

    checkToken()
    }
  return (
    <section className='blog0'>
        <h2 className="blog0-heading">{heading}</h2>
        
       
        
       
        <p className='blog-p0'>{content}</p>
        <div className="author0" style={{cursor:"pointer"}}onClick={()=>{
            setspecusername(author)
            navigate("/specuser")
        }}>- {author}</div>
        <div className="upvote-wrap0">
       
        {!filled && <img src={upvote} className="upvote0" onClick={()=>{
            likeClicked()
        }} alt=""/>}
        {filled &&  <img src={upvote_filled} className="upvote0" onClick={()=>{
           likeClicked()
        }} alt=""/>}

  <h4 className='upvote-no0'>{Upvotes}</h4>
        </div>
       


    </section>
  )
}
