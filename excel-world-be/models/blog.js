import { Schema, model } from "mongoose";

const blogSchema = new Schema({

    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }
    
}, { versionKey: false, timestamps: true })

export const blogModel = model('blog', blogSchema)
