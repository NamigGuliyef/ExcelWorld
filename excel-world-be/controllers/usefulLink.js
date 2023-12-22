import { usefulLinkModel } from "../models/usefulLink.js"

export const usefulLinksController = async (req, res) => {
    try {
        const allUsefulLinks = await usefulLinkModel.find()
        return res.status(200).send({ success: true, message: "All useful links", allUsefulLinks })
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in get all useful links" })
    }
}
