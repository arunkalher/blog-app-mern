const Blog=require("../models/blog")

const getAllBlogs=async(req,res)=>{
   
    // console.log(req.query)
    //  let blogs=Blog.find({"heading":{$regex:req.query["search-text"]}})
    // let sort=req.query["sort"]
    let  blogs=Blog.aggregate([{"$match":{"heading":{$regex:req.query["search-text"]}}},{"$project":{"heading":1,"author":1,"date":1,"content":1,"upvotes":1,"length":{"$size":"$upvotes"}}}])
    blogs=blogs.sort(req.query["sort"]+" -length")
    const result=await blogs
    console.log(result)
    res.status(201).json({status:1,data:result})
    
}
// heading:{
//     type:String,
//     required:[true,'must provide a name'],
//     trim:true,
//     maxlength:[50,"name can't be more than 50 characters"]
// },
// author:{
//     type:String,
//     required:[true,'must provide a name'],
//     trim:true,
//     maxlength:[15,"name can't be more than 15 characters"]
// },
// date:{
//     type:Date,
//     default:Date.now()
// },
// content:{
//     type:String,
//     required:[true,'must provide a name'],
//     trim:true
// },
// upvotes:{
//     type:Number,
//     default:4 
// }

const getBlog=async(req,res)=>{
    console.log(req.params)
    const {id:username}=req.params
    console.log(username)
    let blogs=Blog.find({author:username})
    blogs=blogs.sort("-upvotesLength")   
    const result=await blogs  

    res.status(201).json({status:1,data:result})
  
}
const createBlog=async(req,res)=>{
    try{
        const {heading,content,author}=req.body

    const blog=await Blog.create({
        heading,
        content,
        author
        })
    res.status(200).json({status:1,data:blog})
    }
    catch(err)
    {res.status(200).json({status:0,error:err})
     
    }
    
}
const getBlogByID=async(req,res)=>{
    console.log(req.params)
    const {id}=req.params
    console.log(id)
    let blogs=await Blog.findOne({_id:id})
    res.status(201).json({status:1,data:blogs})
}
const updateBlogByID=async(req,res)=>{
    const {id}=req.params

    console.log(req.body)
    try{
       
        const blog=await Blog.updateOne({_id:id},req.body)
        res.status(200).json({status:1,blog:blog}) 
    }
   catch(err){
    res.status(200).json({status:0,error:err}) 
   }
}
const updateBlog=async(req,res)=>{
    const {id}=req.params
    console.log(id)
}
const deleteBlogByID=async(req,res)=>{
    const {id}=req.params
    try{
        const blog=await Blog.deleteOne({_id:id})
        res.status(200).json({status:1,blog:blog}) 
    }
    catch(err){
        res.status(200).json({status:0,error:err}) 
       }
   

}
module.exports={
    getAllBlogs,
    getBlog,
    createBlog,   
    updateBlog,
    deleteBlogByID,
    getBlogByID,
    updateBlogByID
}