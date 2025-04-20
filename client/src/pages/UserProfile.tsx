import { useEffect, useState } from "react"
import { useIntakeForm } from "../context/IntakeFormContext"
import "./UserProfile.css"
import User from "../interfaces/User"
import { getUserProfile } from "../services/userService"

const Profile = () => {
	const { data } = useIntakeForm()
	const [profile, setProfile] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const userData = await getUserProfile()
				setProfile(userData)
			} catch (err: any) {
				console.error("Failed to load profile", err)
			}
			setIsLoading(false)
		}

		fetchProfile()
	}, [])

	if (isLoading) return <div>Loading profile...</div>

	const displayData = profile || data

	return (
		<div className="form-wrapper">
			<div className="form-page">
				<h2>Personal Profile</h2>
				<br />
				<br />
				<p>
					<strong>Name:</strong> {displayData.name || "Not provided"}
				</p>
				<br />
				<p>
					<strong>Age:</strong>{" "}
					{displayData.age + " years old" || "Not provided"}
				</p>
				<br />
				<p>
					<strong>Sex:</strong> {displayData.sex || "Not provided"}
				</p>
				<br />
				<p>
					<strong>Current Weight:</strong>{" "}
					{displayData.weight
						? `${displayData.weight} kg`
						: "Not provided"}
				</p>
				<br />
				<p>
					<strong>Why you're here:</strong>{" "}
					{displayData.whyHere || "Not provided"}
				</p>
				<br />
				<p>
					<strong>Goal:</strong> {displayData.goal || "Not provided"}
				</p>
				<br />
			</div>
		</div>
	)
}

export default Profile
