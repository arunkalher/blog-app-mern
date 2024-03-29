import React,{ useState,useEffect} from 'react'
import upvote from "../images/empty_like.jpg"
import upvote_filled from "../images/filled_like.jpg"
import edit from "../images/edit.png"
import delete_ from "../images/delete.png"
import "./Blog.css"
import {useNavigate} from "react-router-dom"



export default function Blog(props) {

    const {setpostid}=props.id
    const navigate=useNavigate()
    const {setspecusername}=props.spec
  
    const edit_delete=props.edit_delete
    const [filled,setfilled]=useState(false)
    const {setblogDisplay,setblogsDisplay,setspecblog}=props.triggers
   
    // <Router>
    // <Routes>
    // <Route path="/specific_path" element={<Specificblog />}></Route>
    // <Route path="/" element={<> <Navbar />
    // <Blogs /></>}></Route>
    // </Routes>
   
   
    // </Router>
    let {heading,author,date,content,upvotes:_upvotes,_id}=props.data
    const [upvotes,setupvotes]=useState(_upvotes.length)
 
  
    const [username,setusername]=useState("")
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
    useEffect(
        ()=>{
  
    setupvotes(_upvotes.length)
            
        const fetchData=async()=>
        {   
         
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
           
                 if(res.status)
                 {
                    setusername(res.username)
                    if (_upvotes.includes(res.username))
                    {
                     setfilled(true)
                    
                    }
                    else{
                        setfilled(false)
                    }
                    
                    
                 }
                 
            }
         
        }
        fetchData()
       
    },[_upvotes])
    const readClicked=()=>{
        if(!expand)
        { 
            if(onceClicked)
            {   
               
                // navigate("/specific_path")
                setblogsDisplay(false)
                setblogDisplay(true)
               setspecblog({...props.data,newupvotes:upvotes,filled:filled})
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
    function likeClicked()
    {   
     
        
        let state=filled
        async function checkToken()
        {
        
            
        if(username)
        {
          

                if(!state)
                {   
                    let newarray=[..._upvotes,username]
                    let params =  {
                        method: "PATCH",
                        headers:{
                          'Content-Type':'application/json'
                      },
                      body:JSON.stringify({
                        upvotes:newarray
                      })
                    }
                 await fetch("/blogs/blog/"+_id,params)
                      
                   
                  
                     
                    

                }
                else{
                    let newarray=_upvotes.filter((ele)=>ele!==username)
                    let params =  {
                        method: "PATCH",
                        headers:{
                          'Content-Type':'application/json'
                      },
                      body:JSON.stringify({
                        upvotes:newarray
                      })
                    }
                 await fetch("/blogs/blog/"+_id,params)
                      
                    
                 
                     
                   
                }
             
        }
        else{
           navigate("/signin")
        }
    }
    if(filled)
    setupvotes(upvotes-1)
else
setupvotes(upvotes+1)
    setfilled(!filled)
   

    checkToken()
    }

  return (
   
  
   <section className='blog'>
        <h2 className="blog-heading" onClick={()=>{ setblogsDisplay(false)
                setblogDisplay(true)
                setspecblog({...props.data,newupvotes:upvotes,filled:filled})
                }}>{heading}</h2>
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
            <img  id="delete-image" src={delete_} alt="Delete" onClick={()=>{

                const tryDelete=async()=>{
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
                           
                        
                         if(res.status)
                         {
                            

                            let params =  {
                                method: "DELETE"
                            
                            }
                          
                           await fetch("/blogs/blog/"+_id,params)
                              
                            
                           
                             navigate("/myprofile")





                         }
                         else{
                            navigate("/signin")
                         }
                    }
                    else{
                        navigate("/signin")
                    }

                }

                tryDelete()
            }} />
        </section>
        <div className="upvote-wrap">
        {!filled && <img src={upvote} className="upvote" onClick={()=>{
            likeClicked()
        }} alt=""/>}
        {filled &&  <img src={upvote_filled} className="upvote" onClick={()=>{
           likeClicked()
        }} alt=""/>}
        <h4 className='upvote-no'>{upvotes}</h4>
        </div>
       


    </section>

   

    
   
    


    
  )
}
