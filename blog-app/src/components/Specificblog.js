import React,{useContext, useEffect} from 'react'
import Contextblog from '../contexts/Contextblog'
import upvote from "../images/upvote.svg"
import "./Specificblog.css"
export default function Specificblog(props) {
  useEffect(()=>window.scrollTo(0,0),[])
  let {heading,author,date,content,upvotes,minRead}=props.data
  return (
    <section className='blog0'>
        <h2 className="blog0-heading">{heading}</h2>
        
       
        
       
        <p className='blog-p0'>{content}</p>
        <div className="author0">- {author}</div>
        <div className="upvote-wrap0">
        <img src={upvote} className="upvote0" alt=""/>
        <h4 className='upvote-no0'>{upvotes}</h4>
        </div>
       


    </section>
  )
}
