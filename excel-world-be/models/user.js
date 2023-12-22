import mongoose, { Schema, model } from 'mongoose'

const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  location: { type: String },
  purchased_resourced: { type: [mongoose.Schema.Types.ObjectId], required: true, ref: 'resource' },
  role: { type: String, default: 'user' }
}, { versionKey: false, timestamps: true })





export const userModel = model('user', userSchema)
