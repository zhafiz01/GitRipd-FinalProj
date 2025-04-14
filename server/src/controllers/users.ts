// CONTROLLER FUNCTIONS FOR ADDING A NEW USER TO THE SYSTEM - AUTHENTICATION STAGE
import WorkoutPlan from "../models/WorkoutPlan"
import HTTPHandler from "../helpers/HTTPHandler"

// GET workout plans by user
export const getWorkoutPlansByUser: HTTPHandler = async (req, res) => {
  try {
    const { userId } = req.params

    const workoutPlan = await WorkoutPlan.find({ userId }).populate("exercises")

    if (!workoutPlan) {
      return res.status(404).json({ message: "No workout plans found" })
    }

    res.status(200).json(workoutPlan)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error retrieving workout plans" })
  }
}