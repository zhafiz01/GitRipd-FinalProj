import { useIntakeForm } from "../../context/IntakeFormContext"

const BirthdayInput = () => {
	const { data, updateData } = useIntakeForm()

	const handleBirthdayChange = (birthday: string) => {
		const birthDate = new Date(birthday)
		const today = new Date()
		let age = today.getFullYear() - birthDate.getFullYear()
		const m = today.getMonth() - birthDate.getMonth()
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--
		}

		updateData({ birthday, age })
	}

	return (
		<div>
			<label htmlFor="birthday">Select your birthday:</label>
			<input
				type="date"
				id="birthday"
				value={data.birthday || ""}
				onChange={(e) => handleBirthdayChange(e.target.value)}
			/>
			{data.age !== undefined && <p>You're {data.age} years old.</p>}
		</div>
	)
}

export default BirthdayInput
