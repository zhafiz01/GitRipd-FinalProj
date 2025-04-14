import express from "express"
import { saveWorkoutPlan } from "../controllers/workoutPlans"

const router = express.Router()

router.post("/workout-plan", saveWorkoutPlan)

export default router