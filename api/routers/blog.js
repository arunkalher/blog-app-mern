const express=require("express")
const router=express.Router()
const {
    getAllBlogs,
    getBlog,
    createBlog,  
    updateBlog, 
    deleteBlog,
    getBlogByID,
    updateBlogByID
} =require("../controllers/blogs")

router.route("/").get(getAllBlogs).post(createBlog)
router.route("/:id").get(getBlog).patch(updateBlog).delete(deleteBlog)
router.route("/blog/:id").get(getBlogByID).patch(updateBlogByID)

// router.route("/write").get(getlBlog)

module.exports=router