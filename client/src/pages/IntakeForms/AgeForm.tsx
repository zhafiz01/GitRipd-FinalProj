import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useIntakeForm } from "../../context/IntakeFormContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleArrowLeft, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons"

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
]

const currentYear = new Date().getFullYear()

const AgeForm = () => {
	const navigate = useNavigate()
	const { updateData } = useIntakeForm()

	const [birthDate, setBirthDate] = useState({
		month: "January",
		day: "",
		year: "",
	})

	const calculateAge = (dob: Date): number => {
		const today = new Date()
		let age = today.getFullYear() - dob.getFullYear()
		const hasHadBirthday =
			today.getMonth() > dob.getMonth() ||
			(today.getMonth() === dob.getMonth() &&
				today.getDate() >= dob.getDate())
		if (!hasHadBirthday) age--
		return age
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { day, month, year } = birthDate
		if (!day || !month || !year) return

		const monthIndex = months.indexOf(month)
		const dob = new Date(Number(year), monthIndex, Number(day))

		const age = calculateAge(dob)

		updateData({
			birthday: dob.toISOString().split("T")[0],
			age,
		})

		navigate("/sex")
	}
	return (
		<form onSubmit={handleSubmit}>
			<label>When is your birthday?</label>
			<div>
				<select
					value={birthDate.month}
					onChange={(e) =>
						setBirthDate((prev) => ({
							...prev,
							month: e.target.value,
						}))
					}
				>
					{months.map((month) => (
						<option
							key={month}
							value={month}
						>
							{month}
						</option>
					))}
				</select>
				<input
					type="number"
					placeholder="Day"
					min="1"
					max="31"
					value={birthDate.day}
					onChange={(e) =>
						setBirthDate((prev) => ({ ...prev, day: e.target.value }))
					}
				/>
				<input
					type="number"
					placeholder="Year"
					min="1900"
					max={currentYear}
					value={birthDate.year}
					onChange={(e) =>
						setBirthDate((prev) => ({
							...prev,
							year: e.target.value,
						}))
					}
				/>
			</div>

			{/* Show age if valid */}
			{birthDate.day && birthDate.month && birthDate.year && (
				<p>
					You’re{" "}
					{calculateAge(
						new Date(
							Number(birthDate.year),
							months.indexOf(birthDate.month),
							Number(birthDate.day)
						)
					)}{" "}
					years old.
				</p>
			)}
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

export default AgeForm

// import { FormEvent, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { useIntakeForm } from "../../context/IntakeFormContext"

// const AgeForm = () => {
// 	const { updateData } = useIntakeForm()
// 	const navigate = useNavigate()
// 	const [birthday, setBirthday] = useState(
// 		new Date().toISOString().split("T")[0]
// 	)

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

// 	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
// 		e.preventDefault()

// 		if (!birthday) return

// 		const age = calculateAge(birthday)
// 		updateData({ birthday, age })
// 		navigate("/sex")
// 	}

// 	return (
// 		<form onSubmit={handleSubmit}>
// 			<label htmlFor="birthday">Select your birthday:</label>
// 			<br />
// 			<input
// 				type="date"
// 				id="birthday"
// 				value={birthday}
// 				onChange={(e) => setBirthday(e.target.value)}
// 			/>
// 			<br />
// 			<p>You’re {calculateAge(birthday)} years old.</p>
// 			<button type="submit">Continue</button>
// 		</form>
// 	)
// }

// export default AgeForm
