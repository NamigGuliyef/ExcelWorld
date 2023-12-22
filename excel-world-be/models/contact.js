import { Schema, model } from "mongoose";

const contactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true }
}, { versionKey: false, timestamps: true })

export const contactModel = model('contact', contactSchema)
