import { HomeYoutubeModel } from "../models/homeYoutube.js"


// home page get youtube link
export const getHomeYoutubeLinkController = async (req, res) => {
  try {
      const youtubeLink = await HomeYoutubeModel.find().select('-_id')
      return res.status(201).send({ success: true, message: "Youtube link", youtubeLink })
  } catch (error) {
      return res.status(500).send({ success: false, message: "Error in get youtube link", error: error.message })
  }
}
