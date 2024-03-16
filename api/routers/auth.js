const express=require("express")
const router=express.Router()
const {
    register,login,checktoken,getUser
} =require("../controllers/auth")

router.route("/").post(register)
router.route("/:username").get(getUser)
router.route("/login").post(login)
 
router.route("/checktoken").post(checktoken)
module.exports=router