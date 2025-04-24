import { useEffect, useState } from "react"
import { useIntakeForm } from "../context/IntakeFormContext"
import User from "../interfaces/User"
import { getUserProfile } from "../services/userService"
import "./UserProfile.css"

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
				<h2
					style={{
						fontSize: 40,
						color: "#1ed490",
						marginBottom: "30px",
					}}
				>
					Personal Profile
				</h2>
				<p className="profile-details">
					<strong className="profile-details">Name:</strong>{" "}
					{displayData.name || "Not provided"}
				</p>
				<p className="profile-details">
					<strong className="profile-details">Age:</strong>{" "}
					{displayData.age + " years old" || "Not provided"}
				</p>
				<p className="profile-details">
					<strong className="profile-details">Sex:</strong>{" "}
					{displayData.sex || "Not provided"}
				</p>
				<p className="profile-details">
					<strong className="profile-details">Current Weight:</strong>{" "}
					{displayData.weight
						? `${displayData.weight} lbs`
						: "Not provided"}
				</p>
				<p className="profile-details">
					<strong className="profile-details">
						Why you're here:
					</strong>{" "}
					{displayData.whyHere || "Not provided"}
				</p>
				<p className="profile-details">
					<strong className="profile-details">Goal:</strong>{" "}
					{Array.isArray(displayData.goal) &&
					displayData.goal.length > 0
						? displayData.goal.join(", ")
						: "Not provided"}
				</p>
			</div>
		</div>
	)
}

export default Profile
