import WorkoutPlan from "../models/WorkoutPlan"
import HTTPHandler from "../helpers/HTTPHandler"
import { saveExercises } from "./exercises"

// Save workout plan to user
export const saveWorkoutPlan: HTTPHandler = async (req, res) => {
  try {
    const { userId, exercises } = req.body
    const exerciseIds = await saveExercises(exercises)

    const newPlan = new WorkoutPlan({
      userId,
      exercises: exerciseIds,
    })

    const savedPlan = await newPlan.save()

    res.status(200).json({
      message: "Workout plan saved successfully",
      workoutPlan: savedPlan,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to save workout plan" })
  }
}



/*import HTTPHandler from "../helpers/HTTPHandler";
import WorkoutPlan from "../models/WorkoutPlan"
import { establishConnection } from "../middleware/establishConnection"

export const saveWorkoutPlan: HTTPHandler = async (req, res) => {
  await establishConnection()
  const { exercises } = req.body;

  try {
    const newPlan = new WorkoutPlan({ exercises });

    await newPlan.save();

    res.status(201).json({ message: "Workout plan saved successfully", plan: newPlan });
  } catch (error) {
    res.status(500).json({ message: "Error saving workout plan", error });
  }
};

export const saveWorkoutPlan = async (req: Request, res: Response): Promise<void> => {
  try {
    await establishConnection()

    const { exercises } = req.body

    if (!exercises || !Array.isArray(exercises)) {
      res.status(400).json({ message: "Invalid workout plan data" })
      return
    }

    const saved = await WorkoutPlan.create({ exercises })
    res.status(201).json(saved)
  } catch (error) {
    console.error("Error saving workout plan:", error)
    res.status(500).json({ message: "Error saving workout plan" })
  }
} */