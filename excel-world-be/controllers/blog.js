import { blogModel } from "../models/blog.js";

// get single blog
export const singleBlogController = async (req, res) => {
    try {
        const singleBlog = await blogModel.findById(req.params.id)
        if (!singleBlog) {
            return res.status(404).send({ success: false, message: "Blog not found" })
        }
        return res.status(200).send({ success: true, message: "Get single blog", singleBlog })
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in single blog", error: error.message })
    }
}

// get All blog
export const getAllBlogController = async (req, res) => {
    try {
        const blogs = await blogModel.find()
        return res.status(200).send({ success: true, message: " All blogs", blogs })
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in all blogs", error: error.message })
    }
}
