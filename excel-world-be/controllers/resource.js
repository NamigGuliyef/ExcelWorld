import { resourceModel } from "../models/resource.js"

// get All resource 
export const getALLResourceController = async (req, res) => {
  try {
    const allResources = await resourceModel.find()
    return res.status(200).send({ success: true, message: "All resources", allResources })
  } catch (error) {
    return res.status(500).send({ success: false, message: "Error in get all resources", error: error.message })
  }
}

//get resource
export const getResourceController = async (req, res) => {
  try {
    const resource = await resourceModel.findById(req.params.id)
    return res.status(200).send({ success: true, message: "Single resource", resource })
  } catch (error) {
    return res.status(500).send({ success: false, message: "Error in get resource", error: error.message })
  }
}
