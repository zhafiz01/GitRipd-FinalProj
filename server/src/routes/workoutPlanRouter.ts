import express from "express"
import { saveWorkoutPlan } from "../controllers/workoutPlans"
import { getWorkoutPlansByUser } from "../controllers/users"

const router = express.Router()

router.post("/api/plans", saveWorkoutPlan)
router.get("/api/plans/:userId", getWorkoutPlansByUser)

export default router