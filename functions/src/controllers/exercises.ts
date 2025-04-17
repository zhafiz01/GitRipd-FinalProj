import Exercise from "../models/Exercise"
import { getTargetMuscles, getExercisesByTarget } from "../services/zylaAPIService"
import HTTPHandler from "helpers/HTTPHandler"

export const fetchMuscleTargets: HTTPHandler = async (req, res) => {
    try {
        const targets = await getTargetMuscles()
        res.json(targets)
    } catch (error) {
        res.status(500).json({ message: "Error fetching target muscles" })
    }
}

// Save exercises to MongoDB
export const saveExercises = async (exercises: any[]) => {
    const exerciseIds: any[] = []
  
    for (const exercise of exercises) {
      const existingExercise = await Exercise.findOne({ name: exercise.name })
      if (existingExercise) { // check if existing
        console.log(`🔁 Skipping existing: ${exercise.name}`)
        exerciseIds.push(existingExercise._id)
      } else { // else, save new
        console.log(`💾 Saving new: ${exercise.name}`)
        const newExercise = new Exercise({
          name: exercise.name,
          target: exercise.target,
          equipment: exercise.equipment,
          gifUrl: exercise.gifUrl,
          videos: exercise.videos,
        })
  
        const savedExercise = await newExercise.save()
        console.log(`✅ Saved: ${savedExercise.name}`)
        exerciseIds.push(savedExercise._id)
      }
    }
  
    return exerciseIds
  }

export const fetchExercisesByTarget: HTTPHandler = async (req, res) => {
    const { target } = req.params
    const { save } = req.query

    try {
        const exercises = await getExercisesByTarget(target)

        if (save) {
            const exerciseIds = await saveExercises(exercises)
            return res.status(200).json({
                message: "Exercises fetched and saved",
                savedExerciseIds: exerciseIds,
            })
        } else return res.json(exercises)
    } catch (error) {
        return res.status(500).json({ message: "Error fetching exercises for muscle" })
    }
}

export const getSavedExercises: HTTPHandler = async (req, res) => {
    try {
        const exercises = await Exercise.find()
        res.status(200).json(exercises)
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve saved exercises" })
    }
}