// SCHEMA FOR USER, TO BE USED DURING AUTHENTICATION

import { model, Schema } from "mongoose"

const UserSchema = new Schema(
    {
        userId: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        age: { type: Number, required: true },
        sex: { type: String, enum: ["male", "female", "other"], required: true },
        weight: { type: Number, required: true },
        whyHere: { type: String, required: true },
        goal: { type: String, required: true },
        targetMuscle: { type: [String], default: [] },
    }, 
    { timestamps: true }
)

export default model("User", UserSchema)