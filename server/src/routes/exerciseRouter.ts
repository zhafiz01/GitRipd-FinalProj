import express from "express"
import { fetchMuscleTargets, fetchExercises } from "../controllers/exercises"

const router = express.Router()

router.get("/targets", fetchMuscleTargets)
router.get("/exercises/:muscle", fetchExercises)

export default router