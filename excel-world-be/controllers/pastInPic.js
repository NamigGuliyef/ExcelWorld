import { pastInPicModel } from "../models/pastInPicture.js"

// get past in picture
export const getPastInPictureController = async (req, res) => {
  try {
    const pastInPic = await pastInPicModel.findById(req.params.id)
    return res.status(200).send({ success: true, message: "Single past in picture", pastInPic })
  } catch (error) {
    return res.status(500).send({ success: false, message: "Error in get past in picture", error: error.message })
  }
}

// get All past in picture
export const getAllPastInPictureController = async (req, res) => {
  try {
    const pastInPic = await pastInPicModel.find()
    return res.status(200).send({ success: true, message: "All past in picture", pastInPic })
  } catch (error) {
    return res.status(500).send({ success: false, message: "Error in get past in picture", error: error.message })
  }
}
