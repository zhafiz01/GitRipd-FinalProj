import { Request, Response } from "express"
import { getTargetMuscles, getExercisesByTarget } from "../services/zylaAPIService"

export const fetchMuscleTargets = async (_req: Request, res: Response) => {
    try {
        const targets = await getTargetMuscles()
        res.json(targets)
    } catch (error) {
        res.status(500).json({ message: "Error fetching target muscles" })
    }
}

export const fetchExercises = async (req: Request, res: Response) => {
    const { muscle } = req.params
    try {
        const exercises = await getExercisesByTarget(muscle)
        res.json(exercises)
    } catch (error) {
        res.status(500).json({ message: "Error fetching exercises for muscle" })
    }
}