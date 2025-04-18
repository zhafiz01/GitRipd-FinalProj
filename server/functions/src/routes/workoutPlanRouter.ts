import express from "express"
import { saveWorkoutPlan } from "../controllers/workoutPlans"

const router = express.Router()

router.post("/plans", saveWorkoutPlan)

export default router
