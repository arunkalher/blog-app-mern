const mongoose=require("mongoose")

// id:0,
// heading:"Heading",
// author:"Author",
// date:"12 Aug 1999",
// content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, consequatur quis, expedita ab animi et sed aut accusantium quasi ipsum, incidunt culpa ratione tempore! Explicabo consectetur iusto, voluptatum ad facere nulla sapiente sunt harum, soluta, nobis alias! Vitae, ratione. Explicabo.",
// upvotes:10,
// minRead:5,
const blogSchema=mongoose.Schema({
    heading:{
        type:String,
        required:[true,'must provide a name'],
        trim:true,
        maxlength:[50,"name can't be more than 50 characters"]
    },
    author:{
        type:String,
        required:[true,'must provide a name'], 
        trim:true,
        maxlength:[15,"name can't be more than 15 characters"]
    },
    date:{
        type:Date,
        default:Date.now()
    },
    content:{
        type:String,
        required:[true,'must provide a name'],
        trim:true
    },
    upvotes:{
        type:Array,
        default:[]
    }

})

module.exports=mongoose.model("Blog",blogSchema)