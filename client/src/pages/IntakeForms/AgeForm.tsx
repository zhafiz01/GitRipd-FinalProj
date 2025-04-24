import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useIntakeForm } from "../../context/IntakeFormContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faCircleArrowLeft,
	faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons"
import "./IntakeForms.css"

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
		<div className="form-wrapper">
			<form
				className="form-page--forms"
				onSubmit={handleSubmit}
			>
				<label
					className="form-label"
					htmlFor="birthday"
					style={{ textAlign: "center" }}
				>
					When is your birthday?
				</label>
				<br />
				<div className="date-selectors">
					<select
						className="form-input--month"
						id="birthday"
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
						style={{ width: 75 }}
						className="form-input"
						id="birthday"
						type="number"
						placeholder="Day"
						min="1"
						max="31"
						value={birthDate.day}
						onChange={(e) =>
							setBirthDate((prev) => ({
								...prev,
								day: e.target.value,
							}))
						}
					/>
					<input
						style={{ width: 100 }}
						className="form-input"
						id="birthday"
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
				<br />
				<div className="arrow-btns">
					<button
						type="button"
						onClick={() => navigate("/name")}
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

export default AgeForm
