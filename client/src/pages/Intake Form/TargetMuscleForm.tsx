import { useState, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useIntakeForm } from "../../context/IntakeFormContext"

const TargetMuscleForm = () => {
	const { data, updateData } = useIntakeForm()
	const [targetMuscle, setTargetMuscle] = useState(data.targetMuscle || "")
	const navigate = useNavigate()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!targetMuscle) return

		updateData({ targetMuscle })
		navigate("/profile")
	}

	const handleTargetMuscleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTargetMuscle(e.target.value)
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>What muscles would you like to target?</h2>

			<label>
				<input
					type="radio"
					name="targetMuscle"
					value="abs"
					checked={targetMuscle === "abs"}
					onChange={handleTargetMuscleChange}
				/>
				Abs
			</label>
			<br />

			<label>
				<input
					type="radio"
					name="targetMuscle"
					value="quads"
					checked={targetMuscle === "quads"}
					onChange={handleTargetMuscleChange}
				/>
				Quads
			</label>
			<br />

			<label>
				<input
					type="radio"
					name="targetMuscle"
					value="lats"
					checked={targetMuscle === "lats"}
					onChange={handleTargetMuscleChange}
				/>
				Lats
			</label>
			<br />

			<label>
				<input
					type="radio"
					name="targetMuscle"
					value="legs"
					checked={targetMuscle === "legs"}
					onChange={handleTargetMuscleChange}
				/>
				Legs
			</label>
			<br />

			<label>
				<input
					type="radio"
					name="targetMuscle"
					value="glutes"
					checked={targetMuscle === "glutes"}
					onChange={handleTargetMuscleChange}
				/>
				Glutes
			</label>
			<br />

			<label>
				<input
					type="radio"
					name="targetMuscle"
					value="cardio"
					checked={targetMuscle === "cardio"}
					onChange={handleTargetMuscleChange}
				/>
				Cardio
			</label>
			<br />

			<label>
				<input
					type="radio"
					name="targetMuscle"
					value="back"
					checked={targetMuscle === "back"}
					onChange={handleTargetMuscleChange}
				/>
				Back
			</label>
			<br />

			<label>
				<input
					type="radio"
					name="targetMuscle"
					value="biceps"
					checked={targetMuscle === "biceps"}
					onChange={handleTargetMuscleChange}
				/>
				Biceps
			</label>
			<br />

			<button type="submit">Continue</button>
		</form>
	)
}

export default TargetMuscleForm

