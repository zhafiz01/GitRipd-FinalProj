import axios from "axios"
import { auth } from "../utils/firebase"

export const getSecret = async (): Promise<any> => {
	const user = auth.currentUser
	if (!user) throw new Error("Not Logged In")
	const token = await user.getIdToken()
	return (
		await axios.get(`${import.meta.env.VITE_API_BASE_URL}/secret`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
	).data
}