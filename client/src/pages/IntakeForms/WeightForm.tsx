import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useIntakeForm } from "../../context/IntakeFormContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faCircleArrowRight,
	faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons"
import "./IntakeForms.css"

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
		<div className="form-wrapper">
			<form
				className="form-page"
				onSubmit={handleSubmit}
			>
				<label
					className="form-label"
					htmlFor="weight"
				>
					Enter your weight (lb):
				</label>
				<br />
				<input
					className="form-input"
					id="weight"
					type="number"
					value={weight}
					onChange={(e) => setWeight(e.target.value)}
					placeholder="Weight"
					min="1"
					step="any"
				/>
				<br />
				<div className="arrow-btns">
					<button
						type="button"
						onClick={() => navigate("/sex")}
					>
						<FontAwesomeIcon
							icon={faCircleArrowLeft}
							size="2x"
						/>
					</button>
					<button type="submit">
						<FontAwesomeIcon
							icon={faCircleArrowRight}
							size="2x"
						/>
					</button>
				</div>
			</form>
		</div>
	)
}

export default WeightForm
