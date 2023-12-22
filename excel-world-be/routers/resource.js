import { Router } from "express";
import { getALLResourceController, getResourceController } from "../controllers/resource.js";

const r = Router()

// get all resources
r.get('/', getALLResourceController)
//get resource
r.get('/:id', getResourceController)

export default r
