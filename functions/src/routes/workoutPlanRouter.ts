import express from "express"
import { saveWorkoutPlan } from "../controllers/workoutPlans"

const router = express.Router()

router.post("/api/plans", saveWorkoutPlan)

export default routersev