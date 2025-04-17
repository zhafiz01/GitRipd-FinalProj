import express from "express"
import { saveWorkoutPlan } from "../controllers/workoutPlans"

const router = express.Router()

router.post("/", saveWorkoutPlan)

export default routersev