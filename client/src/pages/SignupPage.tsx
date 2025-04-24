import { useState, FormEvent } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom"
import "./SignUpPage.css"

const Signup = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()

	const handleSignup = async (e: FormEvent) => {
		e.preventDefault()
		try {
			await createUserWithEmailAndPassword(auth, email, password)
			navigate("/name")
		} catch (err) {
			alert("Signup failed")
			console.error(err)
		}
	}

	return (
		<div className="form-wrapper">
			<div className="form-page">
				<h2 style={{ marginBottom: "20px" }}>Sign Up</h2>
				<form onSubmit={handleSignup}>
					<div className="form-input--signup">
						<label>Email:</label>
						<input
							className="form-input__box--signup"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					<div className="form-input--signup">
						<label>Password (6+ chars):</label>
						<input
							className="form-input__box--signup"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className="create-btn__form">
						<button
							className="create-btn"
							type="submit"
						>
							Create Account
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Signup
