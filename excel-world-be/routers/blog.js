import { Router } from "express";
import { getAllBlogController, singleBlogController } from "../controllers/blog.js";
const r = Router()

// get single blog
r.get('/:id', singleBlogController)
//get All blog
r.get('/', getAllBlogController)

export default r

