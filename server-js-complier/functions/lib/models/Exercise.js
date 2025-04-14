"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ExerciseSchema = new mongoose_1.Schema({
    bodyPart: { type: String },
    equipment: { type: String },
    gifUrl: { type: String },
    id: { type: Number },
    name: { type: String, required: true },
    targetMuscle: { type: String, required: true },
    videos: { type: [String] }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("Exercise", ExerciseSchema);
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
//# sourceMappingURL=Exercise.js.map