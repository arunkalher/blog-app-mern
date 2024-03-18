const express=require("express")
const router=express.Router()
const {
    getAllBlogs,
    getBlog, 
    createBlog,  
    updateBlog, 
    deleteBlogByID,
    getBlogByID,
    updateBlogByID
} =require("../controllers/blogs")

router.route("/").get(getAllBlogs).post(createBlog)
router.route("/:id").get(getBlog).patch(updateBlog)
router.route("/blog/:id").get(getBlogByID).patch(updateBlogByID).delete(deleteBlogByID)

// router.route("/write").get(getlBlog)

module.exports=router