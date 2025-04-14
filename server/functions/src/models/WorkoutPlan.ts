import { Schema, model } from "mongoose"

const ExerciseSchema = new Schema({
  id: Number,
  name: String,
  target: String,
  equipment: String,
  gifUrl: String,
  sets: String,
  reps: String,
  notes: String,
})

const WorkoutPlanSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  exercises: [ExerciseSchema],
})

const WorkoutPlan = model("WorkoutPlan", WorkoutPlanSchema)

export default WorkoutPlan