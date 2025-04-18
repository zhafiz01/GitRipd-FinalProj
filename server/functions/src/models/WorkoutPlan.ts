import { Schema, model, Types } from "mongoose"

const WorkoutPlanSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

const WorkoutPlan = model("WorkoutPlan", WorkoutPlanSchema)

export default WorkoutPlan