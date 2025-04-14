// import { FC } from "react"
// import { NavLink } from "react-router-dom"

// const NameInput: FC = () => {
// 	return (
// 		<>
// 			<h1>Let's Get Fit!</h1>
// 			<br />
// 			<h3>Please Provide Your Name</h3>
// 			<br />
// 			<br />
// 			<input
// 				type="text"
// 				id="name"
// 				name="name"
// 			/>
// 			<br />
// 			<NavLink
// 				to="/intake/age"
// 				className={({ isActive }) =>
// 					isActive ? "navlink active" : "navlink"
// 				}
// 			>
// 				<button>ARROW BUTTON HERE</button>
// 			</NavLink>
// 		</>
// 	)
// }

// export default NameInput

// import { useNavigate } from "react-router-dom"
// import { useIntakeForm } from "../../context/IntakeFormContext"

// const NameInput = () => {
// 	const { data, updateData } = useIntakeForm()
// 	const navigate = useNavigate()

// 	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		updateData({ name: e.target.value })
// 	}

// 	const handleNext = () => {
// 		if (data.name?.trim()) {
// 			navigate("/intake/birthday")
// 		}
// 	}

// 	return (
// 		<div>
// 			<h2>What’s your name?</h2>
// 			<input
// 				type="text"
// 				value={data.name || ""}
// 				onChange={handleChange}
// 				placeholder="Enter your name"
// 			/>
// 			<button onClick={handleNext}>Next</button>
// 		</div>
// 	)
// }

// export default NameInput
