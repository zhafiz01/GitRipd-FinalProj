import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

const NameForm = () => {
	const [name, setName] = useState("")
	const navigate = useNavigate()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!name.trim()) return

		localStorage.setItem("userName", name)
		navigate("/age") // or navigate to /intake if you're adding that later
	}

	return (
		<div style={{ padding: "2rem", textAlign: "center" }}>
			{/* <h1>Welcome to Workout Planner</h1> */}
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">What should we call you?</label>
				<br />
				<input
					id="name"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Enter your name"
					style={{
						marginTop: "1rem",
						padding: "0.5rem",
						width: "200px",
					}}
				/>
				<br />
				<NavLink
					to="/intake/age"
					className={({ isActive }) =>
						isActive ? "navlink active" : "navlink"
					}
				>
					<button>ARROW BUTTON HERE</button>
				</NavLink>
				<button
					type="submit"
					style={{
						marginTop: "1rem",
						padding: "0.5rem 1rem",
						border: "none",
						borderRadius: "4px",
						backgroundColor: "#00bcd4",
						color: "#fff",
						cursor: "pointer",
					}}
				>
					Continue
				</button>
			</form>
		</div>
	)
}

export default NameForm
