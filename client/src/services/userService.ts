import axios from "axios"
import User from "../interfaces/User"
import { auth } from "../utils/firebase"

const baseUrl = import.meta.env.VITE_API_BASE_URL + "/user/profile"

export const getUserProfile = async (): Promise<User> => {
	const token = await auth.currentUser?.getIdToken()
	return (await axios.get(baseUrl, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})).data
}

export const saveUserProfile = async (userData: Partial<User>): Promise<User> => {
	const token = await auth.currentUser?.getIdToken(true)
	return (await axios.post(baseUrl, userData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})).data
}