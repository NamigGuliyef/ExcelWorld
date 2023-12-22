import mongoose, { Schema, model } from "mongoose";

const aboutSchema = new Schema({

    title: { type: String, required: true },
    info: { type: String, required: true },
    photo: { type: String, required: true },
    social_media: { type: Array, required: true },
    detailed_info: { type: String, required: true },
    certificates: { type: Array, default: [] },

}, { versionKey: false, timestamps: true })

export const aboutModel = model('about', aboutSchema)
