const express=require("express")
const router=express.Router()
const {
    getAllBlogs,
    getBlog,
    createBlog,  
    updateBlog, 
    deleteBlog
} =require("../controllers/blogs")

router.route("/").get(getAllBlogs).post(createBlog)
router.route("/:id").get(getBlog).patch(updateBlog).delete(deleteBlog)
router.route("/get").get(getBlog)
// router.route("/write").get(getlBlog)

module.exports=router