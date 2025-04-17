import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useIntakeForm } from "../../context/IntakeFormContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleArrowRight, faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons"


const WeightForm = () => {
	const [weight, setWeight] = useState("")
	const { updateData } = useIntakeForm()
	const navigate = useNavigate()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const weightNumber = Number(weight)
		if (!weight.trim() || isNaN(weightNumber) || weightNumber <= 0)
			return

		updateData({ weight: weightNumber })
		navigate("/why")
	}

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="weight">Enter your weight (kg):</label>
			<br />
			<input
				id="weight"
				type="number"
				value={weight}
				onChange={(e) => setWeight(e.target.value)}
				placeholder="Weight"
				min="1"
				step="any"
			/>
			<br />
			<button>
				<FontAwesomeIcon
					icon={faCircleArrowLeft}
					style={{ fontSize: "36px", color: "#333" }}
				/>
			</button>
			<button type="submit">
				<FontAwesomeIcon
					icon={faCircleArrowRight}
					style={{ fontSize: "36px", color: "#333" }}
				/>
			</button>
		</form>
	)
}

export default WeightForm
