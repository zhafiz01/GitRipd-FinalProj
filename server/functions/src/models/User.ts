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
        target: { type: [String], default: [] },
    }, 
    { timestamps: true }
)

export default model("User", UserSchema)