import { Router } from 'express'
import { getAllPastInPictureController, getPastInPictureController } from '../controllers/pastInPic.js'
const r = Router()

// get past in picture
r.get('/:id', getPastInPictureController)
// get All past in picture
r.get('/',getAllPastInPictureController)

export default r
