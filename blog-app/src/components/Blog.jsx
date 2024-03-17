import React,{useReact, useState,useContext} from 'react'
import upvote from "../images/upvote.svg"
import "./Blog.css"
import Contextblog from '../contexts/Contextblog'
import {BrowserRouter as Router,
Routes,
Route,Navigate,useNavigate} from "react-router-dom"
import Specificblog from './Specificblog'


export default function Blog(props) {
    const navigate=useNavigate()
    const {setspecuser,setspecusername}=props.spec
   
    const [blogDisplay,setblogDisplay,blogsDisplay,setblogsDisplay,specblog,setspecblog]=props.triggers
    // <Router>
    // <Routes>
    // <Route path="/specific_path" element={<Specificblog />}></Route>
    // <Route path="/" element={<> <Navbar />
    // <Blogs /></>}></Route>
    // </Routes>
   
   
    // </Router>
    let {heading,author,date,content,upvotes,minRead}=props.data
    const [expand,setExpand]=useState(false)
    const [onceClicked,setOnceClicked]=useState(false)
  
    let dis="none"
    let newC=""
    if(content.length<=300)
    {dis="none"
    newC=content}
    else
    {dis="block"
    newC=content.slice(0,300)+"..."}
   date=(new Date(date).toISOString().split('T')[0])
    const [newcontent,setnewcontent]=useState(newC)
    const readClicked=()=>{
        if(!expand)
        { 
            if(onceClicked)
            {   
               
                // navigate("/specific_path")
                setblogsDisplay(false)
                setblogDisplay(true)
                setspecblog(props.data)
            }
        if (content.length<=600)
        {
            setnewcontent(content)
            setExpand(true)
        }
        else{
            setOnceClicked(true)
            setnewcontent(content.slice(0,600)+"...")
        }}
        else 
        {
            setExpand(false)
            setnewcontent(content.slice(0,300)+"...")
        }
    }

  return (
   
  
   <section className='blog'>
        <h2 className="blog-heading" onClick={()=>{ setblogsDisplay(false)
                setblogDisplay(true)
                setspecblog(props.data)}}>{heading}</h2>
        <div className="author" onClick={()=>{
            setspecusername(author)
            navigate("/specuser")
        }}>- {author}</div>
        <div className="date-wrap">
            <div className='minread'>{(Math.floor(Number(content.length/238)))+1} min Read</div>
            <div className='date'>{date}</div>
        </div>
        
       
        <p className='blog-p'>{newcontent}</p>
        <div className='read-more'style={{display:dis}} onClick={()=>readClicked()}>{expand?"Read Less...":"Read More..."}</div>
        <div className="upvote-wrap">
        <img src={upvote} className="upvote" alt=""/>
        <h4 className='upvote-no'>{upvotes}</h4>
        </div>
       


    </section>

   

    
   
    


    
  )
}
