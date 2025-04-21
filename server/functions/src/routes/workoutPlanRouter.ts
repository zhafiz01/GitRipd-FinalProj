import express from "express"
import { deleteExerciseFromPlan, getWorkoutPlansByUser, saveWorkoutPlan } from "../controllers/workoutPlans"
import checkAuth from "../middleware/auth"

const router = express.Router()

router.post("/", checkAuth, saveWorkoutPlan)
router.get("/", checkAuth, getWorkoutPlansByUser)
router.delete("/exercise/:exerciseId", checkAuth, deleteExerciseFromPlan)

export default router
