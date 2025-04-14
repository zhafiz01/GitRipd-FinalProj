import HTTPHandler from "../helpers/HTTPHandler";
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

/*export const saveWorkoutPlan = async (req: Request, res: Response): Promise<void> => {
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