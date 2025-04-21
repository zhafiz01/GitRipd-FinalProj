import { model, Schema } from "mongoose"

const ExerciseSchema = new Schema({
    bodyPart: { type: String },
    equipment: { type: String },
    gifUrl: { type: String },
    id: { type: Number },
    name: { type: String, required: true },
    target: { type: String, required: true },
    videos: [
        {
            title: { type: String },
            link: { type: String }
        }
    ]
}, {
    timestamps: true
})

export default model("Exercise", ExerciseSchema)