import {Router} from 'express'
import { getHomeYoutubeLinkController } from "../controllers/homeYoutube.js"

const r = Router()

// home page get youtube link 
r.get('/',getHomeYoutubeLinkController)


export default r
