
import './App.css';
import Navbar from './components/Navbar';
import Blogs from './components/Blogs';
import Contextblog from './contexts/Contextblog'
import Signup from './components/Signup';
import Signin from './components/Signin';
import {BrowserRouter as Router,
  Routes,
  Route,Navigate,useNavigate} from "react-router-dom"
import Specificblog from './components/Specificblog';
import Createpost from './components/Createpost';
import Logout from './components/Logout';
import Myprofile from "./components/Myprofile"
import React,{useState,useEffect} from 'react';
function App() {

  const [l,setl]=useState([""])
  const [userN,setuserN]=useState("")
 
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
           let res= await fetch("http://192.168.123.67:5001/users/checktoken",params)
           res=await res.json()
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
    checktoken()
 },[])
  return (
    <Router> 
   
 
  <Navbar list={l} userparams={{userN,setuserN}}/> 
       
    <Routes>
        <Route path="*" element={<>
          < Blogs params={{l,setl}} user={userN} userparams={{userN,setuserN}}/>
        </>}></Route>
        <Route path="/signin" element={<Signin params={{l,setl}}/>}></Route>
        <Route path="/signup" element={<Signup params={{l,setl}}/>}></Route>
        <Route path="/createpost" element={<Createpost  />}></Route>
        <Route path="/myprofile/*" element={<Myprofile userparams={{userN,setuserN}} />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
    </Routes>
    </Router>
  );
}

export default App;
