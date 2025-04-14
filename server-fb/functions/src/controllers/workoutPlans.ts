import { Request, Response } from "express"
import WorkoutPlan from "../models/WorkoutPlan"
import { establishConnection } from "../middleware/establishConnection"

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
}