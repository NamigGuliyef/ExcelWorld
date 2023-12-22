import { Schema, model } from "mongoose";

const verifySchema = new Schema({
    verifyCode: { type: Number},
    userEmail: { type: String },
    createdAt: {
        type: Date,
        expires: 300
    }
}, { versionKey: false, timestamps: true })

export const verifyModel = model('verify', verifySchema)
