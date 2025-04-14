import HTTPHandler from "../helpers/HTTPHandler";
import Exercise from "../models/Exercise";
import { fetchExercisesByMuscle, fetchTargetMuscles } from "../services/zylaAPIService";

// get all targetMuscles
export const getTargetMuscles: HTTPHandler = async (req, res) => {
    try {
        const targetMuscles = await fetchTargetMuscles()
        res.status(200).send(targetMuscles);
    } catch (error) {
        res.status(500).send("Error fetching target muscles")
    }
}
// get exercises by targetMuscle
export const getExercisesByMuscle: HTTPHandler = async (req, res) => {
    const { targetMuscle } = req.query as { targetMuscle: string }

    if (!targetMuscle || typeof targetMuscle !== "string") {
        res.status(400).send("Missing or invalid muscle group")
    }
    
    try {
        // check if data already exists in MongoDB
        const cachedExercises = await Exercise.find({ target: targetMuscle })
        if (cachedExercises.length > 0) res.status(200).send(cachedExercises)
        
        // if not cached, fetch from external API and save to MongoDB
        const apiData = await fetchExercisesByMuscle(targetMuscle)
        const savedExercises = await Exercise.insertMany(apiData)
        res.status(200).send(savedExercises)
    } catch (err: any) {
        console.log(err)
        res.status(500).send("Error retrieving exercises")
    }
}