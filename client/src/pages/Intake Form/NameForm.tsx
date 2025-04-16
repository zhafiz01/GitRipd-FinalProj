import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useIntakeForm } from "../../context/IntakeFormContext"

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
		<form onSubmit={handleSubmit}>
			<label htmlFor="name">What should we call you?</label>
			<br />
			<input
				id="name"
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Enter your name"
			/>
			<br />
			<button type="submit">Continue</button>
		</form>
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
