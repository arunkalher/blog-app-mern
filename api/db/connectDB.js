
const mongoose=require("mongoose")
const connectDB=async (id)=>
{
    mongoose.connect(id)
}
module.exports=connectDB