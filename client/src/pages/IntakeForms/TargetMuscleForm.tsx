// import { useState, FormEvent } from "react"
// import { useNavigate } from "react-router-dom"
// import { useIntakeForm } from "../../context/IntakeFormContext"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import {
// 	faCircleArrowRight,
// 	faCircleArrowLeft,
// } from "@fortawesome/free-solid-svg-icons"
// import "./IntakeForms.css"

// const TargetMuscleForm = () => {
// 	const { data, updateData } = useIntakeForm()
// 	const [targetMuscle, setTargetMuscle] = useState(
// 		data.targetMuscle || ""
// 	)
// 	const navigate = useNavigate()

// 	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
// 		// what is FormEvent/HTMLFormElement?
// 		e.preventDefault()
// 		if (!targetMuscle) return

// 		updateData({ targetMuscle })
// 		navigate("/profile")
// 	}

// 	const handleTargetMuscleChange = (
// 		e: React.ChangeEvent<HTMLInputElement>
// 	) => {
// 		// what is React.ChangeEvent<HTMLInputElement>?
// 		setTargetMuscle(e.target.value)
// 	}

// 	return (
// 		<div className="form-wrapper">
// 			<form
// 				className="form-page"
// 				onSubmit={handleSubmit}
// 			>
// 				<label
// 					className="form-label"
// 					htmlFor="target"
// 				>
// 					What muscles would you like to target?
// 				</label>
// 				<br />
// 				<label>
// 					<input
// 						id="target"
// 						type="radio"
// 						name="targetMuscle"
// 						value="Abs"
// 						checked={targetMuscle === "Abs"}
// 						onChange={handleTargetMuscleChange}
// 					/>
// 					Abs
// 				</label>
// 				<br />
// 				<label>
// 					<input
// 						id="target"
// 						type="radio"
// 						name="targetMuscle"
// 						value="Quads"
// 						checked={targetMuscle === "Quads"}
// 						onChange={handleTargetMuscleChange}
// 					/>
// 					Quads
// 				</label>
// 				<br />
// 				<label>
// 					<input
// 						id="target"
// 						type="radio"
// 						name="targetMuscle"
// 						value="Lats"
// 						checked={targetMuscle === "Lats"}
// 						onChange={handleTargetMuscleChange}
// 					/>
// 					Lats
// 				</label>
// 				<br />
// 				<label>
// 					<input
// 						id="target"
// 						type="radio"
// 						name="targetMuscle"
// 						value="Legs"
// 						checked={targetMuscle === "Legs"}
// 						onChange={handleTargetMuscleChange}
// 					/>
// 					Legs
// 				</label>
// 				<br />
// 				<label>
// 					<input
// 						id="target"
// 						type="radio"
// 						name="targetMuscle"
// 						value="Glutes"
// 						checked={targetMuscle === "Glutes"}
// 						onChange={handleTargetMuscleChange}
// 					/>
// 					Glutes
// 				</label>
// 				<br />
// 				<label>
// 					<input
// 						id="target"
// 						type="radio"
// 						name="targetMuscle"
// 						value="Cardio"
// 						checked={targetMuscle === "Cardio"}
// 						onChange={handleTargetMuscleChange}
// 					/>
// 					Cardio
// 				</label>
// 				<br />
// 				<label>
// 					<input
// 						id="target"
// 						type="radio"
// 						name="targetMuscle"
// 						value="Back"
// 						checked={targetMuscle === "Back"}
// 						onChange={handleTargetMuscleChange}
// 					/>
// 					Back
// 				</label>
// 				<br />
// 				<label>
// 					<input
// 						id="target"
// 						type="radio"
// 						name="targetMuscle"
// 						value="Biceps"
// 						checked={targetMuscle === "Biceps"}
// 						onChange={handleTargetMuscleChange}
// 					/>
// 					Biceps
// 				</label>
// 				<br />
// 				<div className="arrow-btns">
// 					<button
// 						type="button"
// 						onClick={() => navigate("/goal")}
// 					>
// 						<FontAwesomeIcon
// 							icon={faCircleArrowLeft}
// 							style={{ fontSize: "36px", color: "#333" }}
// 						/>
// 					</button>
// 					<button type="submit">
// 						<FontAwesomeIcon
// 							icon={faCircleArrowRight}
// 							style={{ fontSize: "36px", color: "#333" }}
// 						/>
// 					</button>
// 				</div>
// 			</form>
// 		</div>
// 	)
// }

// export default TargetMuscleForm
