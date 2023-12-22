import { contactModel } from "../models/contact.js"
import joi from 'joi'

export const contactController = async (req, res) => {
    try {
        const contactSchema = joi.object({
            name: joi.string().pattern(new RegExp("^[a-zA-Z ]{3,30}$")).required(),
            email: joi.string().email({ tlds: { allow: ["com", "net", "ru", "az"] } }).required(),
            message: joi.string().pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*-,. ]{20,120}$")).required()
        })
        const { error, value } = contactSchema.validate(req.body)
        if (error) {
            return res.status(400).send({ success: false, error: error.message })
        }
        const newContact = await contactModel.create(value)
        return res.status(201).send({ success: true, message: "Contact information has been sent", newContact })
    } catch (error) {
        return res.status(500).send({ success: false, message: "Error in contact", error: error.message })
    }
}