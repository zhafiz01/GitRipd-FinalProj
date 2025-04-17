import { useState, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useIntakeForm } from "../../context/IntakeFormContext"

const WhyHereForm = () => {
    const { data, updateData } = useIntakeForm()
	const [whyHere, setWhyHere] = useState(data.whyHere || "")
	const navigate = useNavigate()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => { // what is FormEvent/HTMLFormElement?
		e.preventDefault()
        if (!whyHere) return

		updateData({ whyHere: whyHere })
		navigate("/goal")
	}

	const handleWhyHereChange = (e: React.ChangeEvent<HTMLInputElement>) => { // what is React.ChangeEvent<HTMLInputElement>?
		setWhyHere(e.target.value)
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>What brings you here?</h2>
			<label>
				<input
					type="radio"
					name="whyHere"
					value="reason1"
					checked={whyHere === "reason1"}
					onChange={handleWhyHereChange}
				/>
				Build a solid workout routine that helps me feel the difference
			</label>
			<br />
			<label>
				<input
					type="radio"
					name="whyHere"
					value="reason2"
					checked={whyHere === "reason2"}
					onChange={handleWhyHereChange}
				/>
				Long-term accountability on my fitness journey
			</label>
			<br />
            <label>
				<input
					type="radio"
					name="whyHere"
					value="reason3"
					checked={whyHere === "reason3"}
					onChange={handleWhyHereChange}
				/>
				Personalized workout routine made for me without the hassle of planning
			</label>
			<br />
            <label>
				<input
					type="radio"
					name="whyHere"
					value="reason4"
					checked={whyHere === "reason4"}
					onChange={handleWhyHereChange}
				/>
				reason 4
			</label>
			<br />
			<button type="submit">Continue</button>
		</form>
	)
}

export default WhyHereForm
