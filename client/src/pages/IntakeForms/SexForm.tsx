import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useIntakeForm } from "../../context/IntakeFormContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleArrowRight, faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons"

const SexForm = () => {
	const { data, updateData } = useIntakeForm()
	const [sex, setSex] = useState(data.sex || "")
	const navigate = useNavigate()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!sex) return

		updateData({ sex })
		navigate("/weight")
	}

	const handleSexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSex(e.target.value)
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>What is your sex?</h2>
			<label>
				<input
					type="radio"
					name="sex"
					value="male"
					checked={sex === "male"}
					onChange={handleSexChange}
				/>
				Male
			</label>
			<br />
			<label>
				<input
					type="radio"
					name="sex"
					value="female"
					checked={sex === "female"}
					onChange={handleSexChange}
				/>
				Female
			</label>
			<br />
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

export default SexForm