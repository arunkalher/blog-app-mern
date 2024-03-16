const User=require("../models/user")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const register=async(req,res)=>{
    console.log("req")
    const {username,password}=req.body
    if (!username || !password)
    {
        res.status(200).json({status:0,error:"Please provide username and password"})
    }
   

    const salt=await bcrypt.genSalt(10)
    let newpassword=await bcrypt.hash(password,salt)
  


   console.log(username,newpassword)
    
    try{
        const user=await User.create({username:username,password:newpassword})
        
        res.status(200).json({status:1,data:username}) 
    }
    catch{
        res.status(200).json({status:0,error:"duplicate username"}) 
    }
   

}

const login=async(req,res)=>{
    
    const {username,password}=req.body
    const user=await User.findOne({username:username})
    // console.log(user)
    if(!user)
    {    return res.status(200).json({status:0,error:"Invalid credentials"}) 

    }
    
    const same=await bcrypt.compare(password,user.password)
    if(same)
    {   
        const token=jwt.sign({userID:user._id,name:username},process.env.JWT_SECRET,{
            expiresIn:'30d'
        })   
        res.status(200).json({status:1,token:token}) 
    }
    else{
        res.status(200).json({status:0,error:"Invalid credentials"}) 
    }
   
} 
const checktoken=async (req,res)=>
{
    const {token}=req.body
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user=await User.findOne({_id:decoded.userID})
        res.status(200).json({status:1,username:user.username,user:user}) 
    }
   catch{
    res.status(200).json({status:0}) 
   }
   
   
}

const getUser=async (req,res)=>
{   
    console.log("p",req.params)
    const {username}=req.params
    try{
       
        const user=await User.findOne({username:username})
        res.status(200).json({status:1,user:user}) 
    }
   catch{
    res.status(200).json({status:0}) 
   }
   
   
}

     
module.exports={
register,login,checktoken,getUser

}

// {
//     "status": 1,
//     "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NWVmMjQyYWM1NDBjMGFmZWVlZTZiYWYiLCJuYW1lIjoia2FsaGVyMSIsImlhdCI6MTcxMDE3MTE3OCwiZXhwIjoxNzEyNzYzMTc4fQ.Kt2vPPCAvAvhhdNbUk-rhVAUXXELsNFPh1jZlwQ0rp0"
//   }