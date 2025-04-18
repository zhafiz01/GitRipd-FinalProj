import express from "express"
import {
	fetchMuscleTargets,
	getSavedExercises,
	fetchExercisesByTarget
} from "../controllers/exercises"

const router = express.Router()

router.get("/targets", fetchMuscleTargets)
router.get("/:target", fetchExercisesByTarget)
router.get("/", getSavedExercises)
router.get("/test", (req, res) => {
	res.send("exerciseRouter is working!")
})

export default router
