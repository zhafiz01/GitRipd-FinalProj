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