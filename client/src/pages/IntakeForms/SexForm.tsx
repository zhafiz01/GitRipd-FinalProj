import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useIntakeForm } from "../../context/IntakeFormContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faCircleArrowRight,
	faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons"
import "./IntakeForms.css"

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

	const handleSexChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setSex(e.target.value)
	}

	return (
		<div className="form-wrapper">
			<form
				className="form-page"
				onSubmit={handleSubmit}
			>
				<label className="form-label">How do you identify?</label>
				<br />
				<div>
					<input
						type="radio"
						name="sex"
						value="male"
						checked={sex === "male"}
						onChange={handleSexChange}
					/>
					Male
				</div>
				<br />
				<div>
					<input
						type="radio"
						name="sex"
						value="female"
						checked={sex === "female"}
						onChange={handleSexChange}
					/>
					Female
				</div>
				<br />
				<div>
					<input
						type="radio"
						name="sex"
						value="Other"
						checked={sex === "Other"}
						onChange={handleSexChange}
					/>
					Other
				</div>
				<br />
				<div className="arrow-btns">
					<button
						type="button"
						onClick={() => navigate("/age")}
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

export default SexForm
