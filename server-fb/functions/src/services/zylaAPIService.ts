import axios from "axios"
import * as dotenv from "dotenv"

dotenv.config()

const ZYLA_API_URL = "https://zylalabs.com/api/4210/ai+workout+planner+api/5108/list+by+target+muscle"

export const fetchTargetMuscles = async () => {
    const endpoint = `${ZYLA_API_URL}/5107/list+of+target+muscles`
    try {
        const response = await axios.get(ZYLA_API_URL + endpoint, {
            headers: {
                "Authorization": `Bearer ${process.env.ZYLA_API_KEY}`,
                "X-RapidAPI-Host": "ai-workout-planner.p.rapidapi.com",
            }
        })
        return response.data
    } catch (error: any) {
        console.error("Zyla API Error (getTargetMuscles):", error.response?.data || error.message)
        throw error
    }
}

export const fetchExercisesByMuscle = async (muscleGroup: string) => {
    const response = await axios.get(ZYLA_API_URL, {
        headers: {
            "Authorization": `Bearer ${process.env.ZYLA_API_KEY}`,
            "X-RapidAPI-Host": "ai-workout-planner.p.rapidapi.com",
        },
        params: { target: muscleGroup }
    })

    const exercises = response.data.map((exercise: any) => ({
        bodyPart: exercise.bodyPart,
        equipment: exercise.equipment,
        gifUrl: exercise.gifUrl,
        id: exercise.id,
        name: exercise.name,
        muscleGroup: exercise.muscleGroup,
        videos: exercise.videos || []
    }))
    return exercises
}