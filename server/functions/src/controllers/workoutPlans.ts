import WorkoutPlan from "../models/WorkoutPlan"
import HTTPHandler from "../helpers/HTTPHandler"
import { saveExercises } from "./exercises"

// Save workout plan to user
export const saveWorkoutPlan: HTTPHandler = async (req, res) => {
  try {
    const userId = (req as any).body.loggedInUser.uid
    console.log(userId)
    const { exercises } = req.body
    const newExerciseIds = await saveExercises(exercises)

    let existingPlan = await WorkoutPlan.findOne({ userId })

    if (existingPlan) {
      await existingPlan.populate("exercises")

      existingPlan.exercises.push(...newExerciseIds)

      const updatedPlan = await existingPlan.save()

      res.status(200).json({ 
        message: "Workout plan updated successfully",
        workoutPlan: updatedPlan,
      })
    } else {
      const newPlan = new WorkoutPlan({
        userId,
        exercises: newExerciseIds,
      })

      const savedPlan = await newPlan.save()

      res.status(200).json({
        message: "New workout plan created",
        workoutPlan: savedPlan,
      })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to save workout plan" })
  }
}

// GET workout plans by user
export const getWorkoutPlansByUser: HTTPHandler =
	async (req, res) => {
		try {
			const userId = (req as any).body.loggedInUser.uid

			const workoutPlan = await WorkoutPlan.find({userId}).populate("exercises")

			if (!workoutPlan) res.status(404).json({ message: "No workout plans found" })

			res.status(200).json(workoutPlan)
		} catch (err) {
			console.error(err)
			res
				.status(500)
				.json({
					message: "Error retrieving workout plans"
				})
		}
	}

// DELETE exercise from user's plan 
export const deleteExerciseFromPlan: HTTPHandler = async (req, res) => {
  try {
    const { exerciseId } = req.params
    const userId = (req as any).body.loggedInUser.uid

    const workoutPlan = await WorkoutPlan.findOne({ userId }).populate("exercises")
    if (!workoutPlan) {
      res.status(404).json({ message: "Workout plan not found" })
    }
    else {
      workoutPlan.exercises = workoutPlan.exercises.filter(
        ex => ex._id.toString() !== exerciseId
      )
      await workoutPlan.save()
      res.status(200).json({ message: "Exercise removed", exercises: workoutPlan.exercises })
    }
  } catch (err) {
    console.error("Error deleting exercise:", err)
    res.status(500).json({ message: "Server error" })
  }
}