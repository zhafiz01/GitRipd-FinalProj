import axios from "axios"
import dotenv from "dotenv"

dotenv.config() 

const ZYLA_BASE_URL = "https://zylalabs.com/api/4210/ai+workout+planner+api"


console.log("Loaded ZYLA_API_KEY:", process.env.ZYLA_API_KEY)

const API_KEY = process.env.ZYLA_API_KEY


const headers = {
    Authorization: `Bearer ${API_KEY}`,
}

console.log("Authorization header being sent:", headers)

export const getTargetMuscles = async () => {
    const url = `${ZYLA_BASE_URL}/5107/list+of+target+muscles`
    try {
        const response = await axios.get(url, { headers })
        return response.data
    } catch (error: any) {
        console.error("Zyla API Error (getTargetMuscles):", error.response?.data || error.message)
        throw error
    }
}

export const getExercisesByTarget = async (target: string) => {
    const url = `${ZYLA_BASE_URL}/5108/list+by+target+muscle?target=${target}`
    try {
        const response = await axios.get(url, { headers })
        return response.data
    } catch (error: any) {
        console.error("Zyla API Error (getExercisesByTarget):", error.response?.data || error.message)
        throw error
    }
}


/*import axios from "axios"
import * as dotenv from "dotenv"

dotenv.config()

const ZYLA_API_URL = "https://zylalabs.com/api/4210/ai+workout+planner+api"

export const fetchTargetMuscles = async () => {
    const endpoint = "/5107/list+of+target+muscles"
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

export const fetchExercisesByMuscle = async (targetMuscle: string) => {
    const endpoint = "/5108/list+by+target+muscle"
    try {
        const response = await axios.get(ZYLA_API_URL + endpoint, {
            headers: {
                "Authorization": `Bearer ${process.env.ZYLA_API_KEY}`,
                "X-RapidAPI-Host": "ai-workout-planner.p.rapidapi.com",
            },
            params: { target: targetMuscle }
        })

        const exercises = response.data.map((exercise: any) => ({
            bodyPart: exercise.bodyPart,
            equipment: exercise.equipment,
            gifUrl: exercise.gifUrl,
            id: exercise.id,
            name: exercise.name,
            targetMuscle: exercise.target,
            videos: exercise.videos || []
        }))
        return exercises
    } catch (error: any) {
        console.error("Zyla API Error (getExercisesByMuscle):", error.response?.data || error.message)
        throw error
    }
    
}*/