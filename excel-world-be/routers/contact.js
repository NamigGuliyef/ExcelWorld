import { Router } from "express";
import { contactController } from "../controllers/contact.js";
const r = Router()

r.post('/', contactController)



export default r

