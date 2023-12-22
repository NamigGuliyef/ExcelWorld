import { model, Schema } from "mongoose";

const resourceSchema = new Schema({

  name: { type: String, required: true },
  category: { type: String, required: true },
  photo: { type: String, required: true },
  link_file: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  details: { type: String, required: true },
  discount: { type: Number, required: true }

}, { versionKey: false, timestamps: true })

export const resourceModel = model('resource', resourceSchema)