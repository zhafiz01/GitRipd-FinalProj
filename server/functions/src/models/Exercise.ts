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



/*

const MuscleGroups = [
    "abs",
    "quads",
    "lats",
    "calves",
    "pectorals",
    "glutes",
    "hamstrings",
    "adductors",
    "triceps",
    "cardiovascular system",
    "spine", 
    "upper back",
    "biceps",
    "delts",
    "forearms",
    "traps",
    "serratus anterior",
    "abductors",
    "levator spaculae"
]

*/