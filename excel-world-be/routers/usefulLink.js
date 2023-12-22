import { Router } from "express";
import { usefulLinksController } from "../controllers/usefulLink.js";

const r = Router()

// get all useful links
r.get('/', usefulLinksController)


export default r