import React,{useEffect} from 'react'

export default function Specuser(props) 
{   
    const username=props.username
    useEffect(()=>{
       
        const userInfo=async()=>{
       
             
      
            
               let res= await fetch("http://192.168.123.67:5001/users"+"/"+username)
               res=await res.json()
               console.log(res)
             
              
         
         
        }
      userInfo()
     },[])
    console.log(props)
    
  return (
    <div>
      USER 
    </div>
  )
}
