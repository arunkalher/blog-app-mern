const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,'must provide a name'],
        trim:true,
        minlength:[3,"name can't be less than 3"],
        maxlength:[50,"name can't be more than 50 characters"],
        unique:true 
    },
    password:{
        type:String,
        required:[true,'must provide a password']
     
    },
    name:{
        type:String,
        default:"",
        trim:true,
        maxlength:[50,"name can't be more than 50 characters"]
    },
    role:{
        type:String,
        default:"",
        trim:true,
        maxlength:[50,"name can't be more than 15 characters"]
    },
    from:{
        type:String,
        default:"",
        trim:true,
        maxlength:[50,"name can't be more than 15 characters"]
    },
    contact:{
        type:String,
        default:"",
        trim:true,
        maxlength:[50,"name can't be more than 15 characters"]
    },
    

})


module.exports=mongoose.model("User",userSchema)