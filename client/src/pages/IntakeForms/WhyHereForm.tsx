import { useState, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useIntakeForm } from "../../context/IntakeFormContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faCircleArrowRight,
	faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons"
import "./IntakeForms.css"

const WhyHereForm = () => {
	const { data, updateData } = useIntakeForm()
	const [whyHere, setWhyHere] = useState(data.whyHere || "")
	const navigate = useNavigate()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!whyHere) return

		updateData({ whyHere: whyHere })
		navigate("/goal")
	}

	const handleWhyHereChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setWhyHere(e.target.value)
	}

	return (
		<div className="form-wrapper">
			<form
				className="form-page--forms"
				onSubmit={handleSubmit}
			>
				<label className="form-label">What brings you here?</label>
				<br />
				<div>
					<input
						type="radio"
						name="whyHere"
						value="I want to build a routine with intention — not pressure."
						checked={
							whyHere ===
							"I want to build a routine with intention — not pressure."
						}
						onChange={handleWhyHereChange}
					/>
					{""} I want to build a routine with intention — not pressure.
				</div>
				<br />
				<div>
					<input
						type="radio"
						name="whyHere"
						value="I’m not sure where to begin, but I’m ready to feel better and move more."
						checked={
							whyHere ===
							"I’m not sure where to begin, but I’m ready to feel better and move more."
						}
						onChange={handleWhyHereChange}
					/>
					  {""} I’m not sure where to begin, but I’m ready to feel stronger and move more.
				</div>
				<br />
				<div>
					<input
						type="radio"
						name="whyHere"
						value="Not trying to be an athlete, just want to keep up with life (and stairs)."
						checked={
							whyHere ===
							"Not trying to be an athlete, just want to keep up with life (and stairs)."
						}
						onChange={handleWhyHereChange}
					/>
					{""} Not trying to be an athlete, just want to keep up with life (and stairs).
				</div>
				<br />
				<div className="arrow-btns">
					<button
						type="button"
						onClick={() => navigate("/weight")}
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

export default WhyHereForm
