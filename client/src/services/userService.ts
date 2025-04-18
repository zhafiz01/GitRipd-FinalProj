import axios from "axios"
import User from "../interfaces/User"
import { auth } from "../utils/firebase"

const baseUrl = import.meta.env.VITE_API_BASE_URL + "/profile"

export const getUserProfile = async (): Promise<User> => {
	const token = await auth.currentUser?.getIdToken()
	if (!token) {
		throw new Error("User not authenticated")
	}

	const response = await axios.get(baseUrl, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

	return response.data
}

export const saveUserProfile = async (
	userData: Partial<User>
): Promise<User> => {
	const token = await auth.currentUser?.getIdToken()
	if (!token) {
		throw new Error("User not authenticated")
	}

	const response = await axios.post(baseUrl, userData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

	return response.data
}