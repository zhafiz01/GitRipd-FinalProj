import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useIntakeForm } from "../../context/IntakeFormContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faCircleArrowRight,
	faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons"
import "./IntakeForms.css"

const NameForm = () => {
	const [name, setName] = useState("")
	const { updateData } = useIntakeForm()
	const navigate = useNavigate()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!name.trim()) return

		updateData({ name }) // calls method inside context
		navigate("/age")
	}

	return (
		<div className="form-wrapper">
			<form
				className="form-page"
				onSubmit={handleSubmit} // "prop" that accepts handleSubmit function
			>
				<label
					className="form-label"
					htmlFor="name"
				>
					What should we call you?
				</label>
				<br />
				<input
					className="form-input"
					id="name"
					type="text"
					value={name} // state value
					onChange={(e) => setName(e.target.value)} // state is updated
					placeholder="Enter your name"
				/>
				<br />
				<div className="arrow-btns">
					<button
						type="button"
						onClick={() => navigate("/welcome")}
					>
						<FontAwesomeIcon
							icon={faCircleArrowLeft}
							size="2x"
						/>
					</button> 
					{/* when clicked, called onSubmit */}
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

export default NameForm
