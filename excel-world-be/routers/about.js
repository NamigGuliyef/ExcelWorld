import { Router } from "express";
import { getAboutController } from "../controllers/about.js";
const r = Router()

// get about us
r.get('/', getAboutController)


export default r
