import { Schema, model } from "mongoose";

const HomeYoutubeSchema = new Schema({
    largeYoutubeLink: { type: String, required: true },    
}, { versionKey: false, timestamps: true })


export const HomeYoutubeModel = model('youtube_link', HomeYoutubeSchema)

