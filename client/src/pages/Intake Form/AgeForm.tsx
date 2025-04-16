import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useIntakeForm } from "../../context/IntakeFormContext"

const AgeForm = () => {
	const { updateData } = useIntakeForm()
	const navigate = useNavigate()
	const [birthday, setBirthday] = useState(
		new Date().toISOString().split("T")[0]
	)

	const calculateAge = (birthday: string): number => {
		const birthDate = new Date(birthday)
		const today = new Date()
		let age = today.getFullYear() - birthDate.getFullYear()
		const m = today.getMonth() - birthDate.getMonth()
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--
		}
		return age
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!birthday) return

		const age = calculateAge(birthday)
		updateData({ birthday, age })
		navigate("/sex")
	}

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="birthday">Select your birthday:</label>
			<br />
			<input
				type="date"
				id="birthday"
				value={birthday}
				onChange={(e) => setBirthday(e.target.value)}
			/>
			<br />
			<p>You’re {calculateAge(birthday)} years old.</p>
			<button type="submit">Continue</button>
		</form>
	)
}

export default AgeForm

// import { useIntakeForm } from "../../context/IntakeFormContext"
// import { useNavigate } from "react-router-dom"
// import { useState } from "react"

// const AgeForm = () => {
// 	const { data, updateData } = useIntakeForm()
// 	const navigate = useNavigate()
//     const [localBirthday, setLocalBirthday] = useState(() => {
//         return data.birthday || new Date().toISOString().split("T")[0]
//     })

// 	const calculateAge = (birthday: string): number => {
// 		const birthDate = new Date(birthday)
// 		const today = new Date()
// 		let age = today.getFullYear() - birthDate.getFullYear()
// 		const m = today.getMonth() - birthDate.getMonth()
// 		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
// 			age--
// 		}
// 		return age
// 	}

// 	const handleContinue = () => {
// 		if (!localBirthday) return

// 		const age = calculateAge(localBirthday)
// 		updateData({ birthday: localBirthday, age })
// 		navigate("/sex")
// 	}

// 	return (
// 		<div>
// 			<label htmlFor="birthday">Select your birthday:</label>
// 			<input
// 				type="date"
// 				id="birthday"
// 				value={localBirthday}
// 				onChange={(e) => setLocalBirthday(e.target.value)}
// 			/>
// 			{localBirthday && <p>You're {calculateAge(localBirthday)} years old.</p>}
// 			<button onClick={handleContinue}>Continue</button>
// 		</div>
// 	)
// }

// export default AgeForm
