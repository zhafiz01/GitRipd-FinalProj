import { useState, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useIntakeForm } from "../../context/IntakeFormContext"

const TargetMuscleForm = () => {
    const { data, updateData } = useIntakeForm()
	const [targetMuscle, setTargetMuscle] = useState(data.targetMuscle || "")
	const navigate = useNavigate()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => { // what is FormEvent/HTMLFormElement?
		e.preventDefault()
        if (!targetMuscle) return

		updateData({ targetMuscle })
		navigate("/profile")
	}

	const handleTargetMuscleChange = (e: React.ChangeEvent<HTMLInputElement>) => { // what is React.ChangeEvent<HTMLInputElement>?
		setTargetMuscle(e.target.value)
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>What muscles would you like to target?</h2>
			<label>
				<input
					type="radio"
					name="targetMuscle"
					value="targetMuscle1"
					checked={targetMuscle === "targetMuscle1"}
					onChange={handleTargetMuscleChange}
				/>
				Abs
			</label>
			<br />
			<label>
				<input
					type="radio"
					name="targetMuscle"
					value="targetMuscle2"
					checked={targetMuscle === "targetMuscle2"}
					onChange={handleTargetMuscleChange}
				/>
				Quads
			</label>
			<br />
            <label>
				<input
					type="radio"
					name="targetMuscle"
					value="targetMuscle3"
					checked={targetMuscle === "targetMuscle3"}
					onChange={handleTargetMuscleChange}
				/>
				Lats
			</label>
			<br />
            <label>
				<input
					type="radio"
					name="targetMuscle"
					value="targetMuscle4"
					checked={targetMuscle === "targetMuscle4"}
					onChange={handleTargetMuscleChange}
				/>
				Legs
			</label>
			<br />
            <label>
				<input
					type="radio"
					name="targetMuscle"
					value="targetMuscle5"
					checked={targetMuscle === "targetMuscle5"}
					onChange={handleTargetMuscleChange}
				/>
				Glutes
			</label>
			<br />
            <label>
				<input
					type="radio"
					name="targetMuscle"
					value="targetMuscle6"
					checked={targetMuscle === "targetMuscle6"}
					onChange={handleTargetMuscleChange}
				/>
				Cardio
			</label>
			<br />
            <label>
				<input
					type="radio"
					name="targetMuscle"
					value="targetMuscle6"
					checked={targetMuscle === "targetMuscle6"}
					onChange={handleTargetMuscleChange}
				/>
				Back
			</label>
			<br />
            <label>
				<input
					type="radio"
					name="targetMuscle"
					value="targetMuscle6"
					checked={targetMuscle === "targetMuscle6"}
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
