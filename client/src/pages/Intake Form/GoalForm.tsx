import { useState, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useIntakeForm } from "../../context/IntakeFormContext"

const GoalForm = () => {
    const { data, updateData } = useIntakeForm()
	const [goal, setGoal] = useState(data.goal || "")
	const navigate = useNavigate()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => { // what is FormEvent/HTMLFormElement?
		e.preventDefault()
        if (!goal) return

		updateData({ goal })
		navigate("/target")
	}

	const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => { // what is React.ChangeEvent<HTMLInputElement>?
		setGoal(e.target.value)
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>What are your goals?</h2>
			<label>
				<input
					type="radio"
					name="goal"
					value="goal1"
					checked={goal === "goal1"}
					onChange={handleGoalChange}
				/>
				Weight Loss
			</label>
			<br />
			<label>
				<input
					type="radio"
					name="goal"
					value="goal2"
					checked={goal === "goal2"}
					onChange={handleGoalChange}
				/>
				Muscle Gain
			</label>
			<br />
            <label>
				<input
					type="radio"
					name="goal"
					value="goal3"
					checked={goal === "goal3"}
					onChange={handleGoalChange}
				/>
				Strength Training
			</label>
			<br />
            <label>
				<input
					type="radio"
					name="goal"
					value="goal4"
					checked={goal === "goal4"}
					onChange={handleGoalChange}
				/>
				Flexibility
			</label>
			<br />
            <label>
				<input
					type="radio"
					name="goal"
					value="goal5"
					checked={goal === "goal5"}
					onChange={handleGoalChange}
				/>
				Cardiovascular Endurance
			</label>
			<br />
            <label>
				<input
					type="radio"
					name="goal"
					value="goal6"
					checked={goal === "goal6"}
					onChange={handleGoalChange}
				/>
				General Fitness
			</label>
			<br />
			<button type="submit">Continue</button>
		</form>
	)
}

export default GoalForm
