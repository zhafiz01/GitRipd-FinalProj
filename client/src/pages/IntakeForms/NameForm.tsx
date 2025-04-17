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

		updateData({ name })
		navigate("/age")
	}

	return (
		<div className="form-wrapper">
			<form
				className="form-page"
				onSubmit={handleSubmit}
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
					value={name}
					onChange={(e) => setName(e.target.value)}
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
							style={{ fontSize: "36px", color: "#333" }}
						/>
					</button>
					<button type="submit">
						<FontAwesomeIcon
							icon={faCircleArrowRight}
							style={{ fontSize: "36px", color: "#333" }}
						/>
					</button>
				</div>
			</form>
		</div>
	)
}

export default NameForm

// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { useIntakeForm } from "../../context/IntakeFormContext"

// const NameForm = () => {
// 	const [name, setName] = useState("")
// 	const navigate = useNavigate()
// 	const { updateData } = useIntakeForm()

// 	const handleSubmit = (e: React.FormEvent) => {
// 		e.preventDefault()

// 		if (!name.trim()) return

// 		updateData({ name })
// 		navigate("/age")
// 	}

// 	return (
// 		<div>
// 			<form onSubmit={handleSubmit}>
// 				<label htmlFor="name">What should we call you?</label>
// 				<br />
// 				<input
// 					id="name"
// 					type="text"
// 					value={name}
// 					onChange={(e) => setName(e.target.value)}
// 					placeholder="Enter your name"
// 				/>
// 				<br />
// 				<button type="submit">Continue</button>
// 			</form>
// 		</div>
// 	)
// }

// export default NameForm
