import { model, Schema } from "mongoose";

const pastInPicSchema = new Schema({
  photo: { type: String, required: true },
  description: { type: String, required: true },
  checked: { type: Boolean, required: true },
}, { versionKey: false, timestamps: true })

export const pastInPicModel = model('pastInPicture', pastInPicSchema)
