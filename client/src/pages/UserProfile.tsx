import { useIntakeForm } from "../context/IntakeFormContext"
import "./UserProfile.css"

const Profile = () => {
	const { data } = useIntakeForm()

	return (
		<div className="form-wrapper">
			<div className="form-page">
				<h2>Personal Profile</h2>
				<br />
				<br />
				<p>
					<strong>Name:</strong> {data.name || "Not provided"}
				</p>
				<br />
				<p>
					<strong>Age:</strong>{" "}
					{data.age + " years old" || "Not provided"}
				</p>
				<br />
				<p>
					<strong>Sex:</strong> {data.sex || "Not provided"}
				</p>
				<br />
				<p>
					<strong>Current Weight:</strong>{" "}
					{data.weight ? `${data.weight} kg` : "Not provided"}
				</p>
				<br />
				<p>
					<strong>Why you're here:</strong>{" "}
					{data.whyHere || "Not provided"}
				</p>
				<br />
				<p>
					<strong>Goal:</strong> {data.goal || "Not provided"}
				</p>
				<br />
				<p>
					<strong>Target Muscles:</strong>{" "}
					{data.targetMuscle || "Not provided"}
				</p>
			</div>
		</div>
	)
}

export default Profile
