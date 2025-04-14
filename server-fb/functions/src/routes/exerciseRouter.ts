import express from "express"
import { getExercisesByMuscle, getTargetMuscles } from "../controllers/exercises"

const router = express.Router()

router.get("/targets", getTargetMuscles)
router.get("/exercises/:muscle", getExercisesByMuscle)

export default router