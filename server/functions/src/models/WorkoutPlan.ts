import { Schema, model } from "mongoose"

const WorkoutPlanSchema = new Schema(
  {
    userId: { type: String, ref: "User", required: true },
    exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

const WorkoutPlan = model("WorkoutPlan", WorkoutPlanSchema)

export default WorkoutPlan