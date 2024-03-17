import React,{useReact, useState,useContext} from 'react'
import upvote from "../images/upvote.svg"
import edit from "../images/edit.png"
import delete_ from "../images/delete.png"
import "./Blog.css"
import Contextblog from '../contexts/Contextblog'
import {BrowserRouter as Router,
Routes,
Route,Navigate,useNavigate} from "react-router-dom"
import Specificblog from './Specificblog'


export default function Blog(props) {

    const {postid,setpostid}=props.id
    const navigate=useNavigate()
    const {setspecuser,setspecusername}=props.spec
  
    const edit_delete=props.edit_delete
    
    const [blogDisplay,setblogDisplay,blogsDisplay,setblogsDisplay,specblog,setspecblog]=props.triggers
    // <Router>
    // <Routes>
    // <Route path="/specific_path" element={<Specificblog />}></Route>
    // <Route path="/" element={<> <Navbar />
    // <Blogs /></>}></Route>
    // </Routes>
   
   
    // </Router>
    let {heading,author,date,content,upvotes,minRead,_id}=props.data
  
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
        <section id="delete-edit" style={{display:edit_delete}} >
            <img  id="edit-image" src={edit} alt="Edit" onClick={()=>{
                setpostid(_id)
                navigate("/editpost")
            }}/>
            <img  id="delete-image" src={delete_} alt="Delete" />
        </section>
        <div className="upvote-wrap">
        <img src={upvote} className="upvote" alt=""/>
        <h4 className='upvote-no'>{upvotes}</h4>
        </div>
       


    </section>

   

    
   
    


    
  )
}
