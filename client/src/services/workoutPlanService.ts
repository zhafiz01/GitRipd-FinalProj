import axios from "axios"
import { auth } from "../utils/firebase"
import Exercise from "../interfaces/Exercise"
import WorkoutPlan from "../interfaces/WorkoutPlan"

const baseUrl = import.meta.env.VITE_API_BASE_URL + "/plans"

export const saveUserWorkoutPlan = async (exercises: Partial<Exercise[]>): Promise<WorkoutPlan> => {
	const token = await auth.currentUser?.getIdToken(true)
	return (await axios.post(baseUrl, { exercises }, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})).data
}

export const getUserWorkoutPlan = async (): Promise<WorkoutPlan[]> => {
	const token = await auth.currentUser?.getIdToken()
	return (await axios.get(baseUrl, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})).data
}