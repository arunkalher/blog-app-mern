import React,{useState,useEffect} from 'react'
import Blog from './Blog'
import "./Blogs.css"

import Specificblog from './Specificblog'
import {useNavigate} from "react-router-dom"
export default function Blogs(props) {
  // const {specusername,setspecusername}=params.specs
  
  const navigate=useNavigate()
  const {postid,setpostid}=props.id
    const [msg,setmsg]=useState("none")
    const [editDelete,setEditDelete]=useState("none")
    const {specusername,setspecusername}=props.spec
    const {userN,setuserN}=props.userparams
    const username=userN
    const {setl}=props.params
    const [blogs,setblogs]=useState(null)
    const [loading,setLoading]=useState(true)
    const [issuccess,setsuccess]=useState(false)
    const [blogDisplay,setblogDisplay]=useState(false)
    const [blogsDisplay,setblogsDisplay]=useState(true)
    const [specblog,setspecblog]=useState({})
    const [sortby,setsortby]=useState("upvotes")
   
    const {searchtext,setsearchtext}=props.searchtext
   
    
    
    const {search,setsearch}=props.search
    const [rerender,setrerender]=useState(true)
    
    const error="Error..."
    //fetch blogs
    useEffect(
        ()=>{
      
          
        const fetchData=async()=>
        {   
            try{
              let data=""
          
              
            let sort=sortby
            if(sortby==="oldest")
            sort="date"
          else if( sortby==="newest")
          sort="-date"
        else
        sort=" "
        
              if(!userN)
            data= await fetch("/blogs?search-text="+searchtext+"&sort="+sort)
          else
          data= await fetch("/blogs/"+userN)
         
              
            if(data.ok)
            {
                data=await data.json()
                
        
            setblogs(data.data)
          
            
            setsuccess(true)
            if(data.data.length===0)
            setmsg("block")
                
            
            }
        
            setLoading(false)
            }
            catch{
          
                setLoading(false)
              
            }

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
              
                   
                  if(userN===res.username)
                  {
                    
                    setEditDelete("flex")
                }
                else{
                  setEditDelete("none")
                }
                 if(res.status)
                 {
                    setl(["My Profile","Create Post","Logout"])
                 }
                 else{
                    setl(["Sign In","Sign Up"])
                 }
            }
            else{
                setl(["Sign In","Sign Up"])
            }
        }
        fetchData()
        return ()=>setuserN("")
   
        }
        ,[userN,search,sortby,rerender,searchtext,setl,setuserN]
    )
  return (

  
       <> 


       {username && <button id="blogs-back" onClick={()=>{
        
        setuserN("")
          navigate("/")

        }}>{String.fromCharCode(8592)} Back</button>}



       
          {blogsDisplay && <section id="blogs">
              
           {(loading) && <h1 style={{margin:"1rem auto",textAlign:"center"}}>Loading.. </h1>}

           {(!loading) && (issuccess)  && 
           (userN==="") && <> 
          
           <section id="search">

<input type="text" id="search-text" value={searchtext} onChange={(e)=>{
  setsearchtext(e.target.value)
 
  
}} />
<button id="search-button" onClick={()=>{
                setsearch(!search)
              }}>Search</button>
            </section>
            <div id="sort-by-name">Sort By : {sortby}</div>
            <section id="sort-By">
             
            <label className='labels' htmlFor="upvotes" onClick={()=>{
              setsortby("upvotes")
            }}>Upvotes</label>
              <input type="radio" name="sort" id="upvotes" />
              <label className='labels' htmlFor="oldest" name="sort"onClick={()=>{
              setsortby("oldest")
            }} >Oldest</label>
              <input type="radio" name="sort" id="oldest" />

              <label className='labels' htmlFor="newest" name="sort"onClick={()=>{
              setsortby("newest")
            }} >Newest</label>
              <input type="radio" name="sort" id="newest" />
           </section>
            
            </>}


              {
                 (!loading) && (issuccess)  && 
              
              <>
           {blogs.map(blog=>
             <Blog re={{rerender,setrerender}} id={{postid,setpostid}} edit_delete={editDelete} spec={{specusername,setspecusername}} key={blog._id} data={blog} triggers={[blogDisplay,setblogDisplay,blogsDisplay,setblogsDisplay,specblog,setspecblog]} />
           )}
           
           </>
          }
           
           {
             (!loading) && (!issuccess)  && <h1 className='error'>{error}</h1>
           }
           
           
          
          
          </section>}
      
          {blogDisplay && <div id="spec-blog" >
          <button id="specbutton" onClick={()=>{
            setrerender(!rerender)
               setblogsDisplay(true)
               setblogDisplay(false)
          }}>{String.fromCharCode(8592)} Back</button>
          <Specificblog data={specblog} spec={{specusername,setspecusername}}/>
          
          </div>}
          </>
     

      

  
  )
}
