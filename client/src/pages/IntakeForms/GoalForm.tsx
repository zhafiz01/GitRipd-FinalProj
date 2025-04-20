import { useState, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useIntakeForm } from "../../context/IntakeFormContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons"
import "./IntakeForms.css"
import { saveUserProfile } from "../../services/userService"

const GoalForm = () => {
	const { data, updateData } = useIntakeForm()
	const [goal, setGoal] = useState(data.goal || "")
	const navigate = useNavigate()

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!goal) return

		const updatedData = {...data, goal}
		updateData(updatedData)

		try {
			console.log("Submitting profile data...", updatedData)
			await saveUserProfile(updatedData)
			console.log("Successfully saved profile data")
			navigate("/dashboard")
		} catch (err) {
			console.error("Failed to save profile data", err)
			alert("There was a problem saving your profile")
		}
	}

	const handleGoalChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setGoal(e.target.value)
	}

	return (
		<div className="form-wrapper">
			<form
				className="form-page"
				onSubmit={handleSubmit}
			>
				<label
					className="form-label"
				>
					What are your goals?
				</label>
				<br />
				<div>
					<input
						type="radio"
						name="goal"
						value="Weight Loss"
						checked={goal === "Weight Loss"}
						onChange={handleGoalChange}
					/>
					Weight Loss
				</div>
				<br />
				<div>
					<input
						type="radio"
						name="goal"
						value="Muscle Gain"
						checked={goal === "Muscle Gain"}
						onChange={handleGoalChange}
					/>
					Muscle Gain
				</div>
				<br />
				<div>
					<input
						type="radio"
						name="goal"
						value="Strength Training"
						checked={goal === "Strength Training"}
						onChange={handleGoalChange}
					/>
					Strength Training
				</div>
				<br />
				<div>
					<input
						type="radio"
						name="goal"
						value="Flexibility"
						checked={goal === "Flexibility"}
						onChange={handleGoalChange}
					/>
					Flexibility
				</div>
				<br />
				<div>
					<input
						type="radio"
						name="goal"
						value="Cardiovascular Endurance"
						checked={goal === "Cardiovascular Endurance"}
						onChange={handleGoalChange}
					/>
					Cardiovascular Endurance
				</div>
				<br />
				<div>
					<input
						type="radio"
						name="goal"
						value="General Fitness"
						checked={goal === "General Fitness"}
						onChange={handleGoalChange}
					/>
					General Fitness
				</div>
				<br />
				<div className="arrow-btns">
					<button
						type="button"
						onClick={() => navigate("/why")}
					>
						<FontAwesomeIcon
							icon={faCircleArrowLeft}
							size="2x"
						/>
					</button>
					<button className="submit-btn" type="submit">
						Submit Your Results
					</button>
				</div>
			</form>
		</div>
	)
}

export default GoalForm
