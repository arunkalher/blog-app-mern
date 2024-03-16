

const express=require("express")
const cors=require("cors")
const app=express()
require("dotenv").config()
app.use(express.json())
const connectDB=require("./db/connectDB")
const router=require("./routers/blog")
const authrouter=require("./routers/auth")
//routes
app.use(cors({
    origin:"*",
    methods:["GET","POST","PATCH","DELETE"]
})) 
app.get("/",(req,res)=>{
    res.send("Blogs App API")
})
app.use("/blogs",router)
app.use("/users",authrouter)
const port=5001
const start=async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        console.log("connected to db")
        app.listen(port,console.log(`Server is running on PORT : ${port}`))
    }
    catch(err){
        console.log(err)
    }
  

}
start()