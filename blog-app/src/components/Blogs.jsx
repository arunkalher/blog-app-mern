import React,{useState,useEffect} from 'react'
import Blog from './Blog'
import "./Blogs.css"
import photo from "../images/cross1.png"
import Specuser from './Specuser'
import Specificblog from './Specificblog'
import {BrowserRouter as Router,
    Routes,
    Route,Navigate,useNavigate} from "react-router-dom"
export default function Blogs(props) {
  // const {specusername,setspecusername}=params.specs
  const navigate=useNavigate()
  const {postid,setpostid}=props.id
    const [msg,setmsg]=useState("none")
    const [editDelete,setEditDelete]=useState("none")
    const {specusername,setspecusername}=props.spec
    const {userN,setuserN}=props.userparams
    const username=userN
    const {l,setl}=props.params
    const [blogs,setblogs]=useState(null)
    const [loading,setLoading]=useState(true)
    const [issuccess,setsuccess]=useState(false)
    const [blogDisplay,setblogDisplay]=useState(false)
    const [blogsDisplay,setblogsDisplay]=useState(true)
    const [specblog,setspecblog]=useState({})
   
    const error="Error..."
    //fetch blogs
    useEffect(
        ()=>{
          console.log("useEffect")
        const fetchData=async()=>
        {   
            try{
              let data=""
            console.log("user",userN)
              if(!userN)
            data= await fetch("http://192.168.123.67:5001/blogs")
          else
          data= await fetch("http://192.168.123.67:5001/blogs"+"/"+userN)
         

            if(data.ok)
            {
                data=await data.json()
                
        
            setblogs(data.data)
            setsuccess(true)
            if(data.data.length==0)
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
                  let res= await fetch("http://192.168.123.67:5001/users/checktoken",params)
                  res=await res.json()
                  if(userN===res.username)
                  {setEditDelete("flex")}
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
        ,[userN]
    )
  return (

  
       <> 
       {username && <button id="blogs-back" onClick={()=>{
        setuserN("")
          navigate("/")

        }}>{String.fromCharCode(8592)} Back</button>}
       <section id="show-msg-wrap" style={{display:msg}}>
       <h1 id="show-msg" >There are no posts to show.</h1>
       <button id="create" onClick={()=>{
        navigate("/createpost")
       }}>Create Post</button>
       </section>
       
          {blogsDisplay && <section id="blogs">
              
           {(loading)?<><h1 style={{margin:"1rem auto",textAlign:"center"}}>Loading.. </h1></>:
           (issuccess)?<>{blogs.map(blog=>{
              return <Blog id={{postid,setpostid}} edit_delete={editDelete} spec={{specusername,setspecusername}} key={blog._id} data={blog} triggers={[blogDisplay,setblogDisplay,blogsDisplay,setblogsDisplay,specblog,setspecblog]}>Hello</Blog>
           })}</>:<h1 className='error'>{error}</h1>}
          
          </section>}
      
          {blogDisplay && <div id="spec-blog" >
          <button id="specbutton" onClick={()=>{
               setblogsDisplay(true)
               setblogDisplay(false)
          }}>{String.fromCharCode(8592)} Back</button>
          <Specificblog data={specblog} spec={{specusername,setspecusername}}/>
          
          </div>}
          </>
     

      

  
  )
}
