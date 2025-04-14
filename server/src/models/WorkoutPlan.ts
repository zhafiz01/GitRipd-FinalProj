import { Schema, model } from "mongoose"

const WorkoutPlanSchema = new Schema(
  {
    exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

const WorkoutPlan = model("WorkoutPlan", WorkoutPlanSchema)

export default WorkoutPlan