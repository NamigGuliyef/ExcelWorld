import { aboutModel } from "../models/about.js"

export const getAboutController = async (req, res) => {
    try {
        const about_us = await aboutModel.find()
        return res.status(200).send({ success: true, message: "About us", about_us })
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in get about us", error: error.message })
    }
}

