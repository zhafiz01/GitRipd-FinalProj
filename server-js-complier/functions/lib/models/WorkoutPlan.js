"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ExerciseSchema = new mongoose_1.Schema({
    id: Number,
    name: String,
    target: String,
    equipment: String,
    gifUrl: String,
    sets: String,
    reps: String,
    notes: String,
});
const WorkoutPlanSchema = new mongoose_1.Schema({
    createdAt: { type: Date, default: Date.now },
    exercises: [ExerciseSchema],
});
const WorkoutPlan = (0, mongoose_1.model)("WorkoutPlan", WorkoutPlanSchema);
exports.default = WorkoutPlan;
//# sourceMappingURL=WorkoutPlan.js.map