import { model, Schema } from "mongoose";
const usefulLinkSchema = new Schema({

  title: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String },
  web_link: { type: String, required: true }

}, { timestamps: true, versionKey: false })

export const usefulLinkModel = model('useful_link', usefulLinkSchema)
