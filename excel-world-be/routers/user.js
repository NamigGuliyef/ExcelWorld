import { Router } from "express";
import { userAuthMiddleWare } from "../auth/authMiddleWare.js";
import { editProfileController, getProfileController } from "../controllers/user.js";
const r = Router()

// edit-profile
r.put('/edit-profile', userAuthMiddleWare, editProfileController)
// get user profile
r.get('/profile', userAuthMiddleWare, getProfileController)

  
export default r
