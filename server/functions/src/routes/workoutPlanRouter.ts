import express from "express"
import { getWorkoutPlansByUser, saveWorkoutPlan } from "../controllers/workoutPlans"
import checkAuth from "../middleware/auth"

const router = express.Router()

router.post("/", checkAuth, saveWorkoutPlan)
router.get("/", checkAuth, getWorkoutPlansByUser)

export default router
