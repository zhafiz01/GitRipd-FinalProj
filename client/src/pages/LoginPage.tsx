import { FormEvent, useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../utils/firebase"
import { NavLink, useNavigate } from "react-router-dom"
import "./LoginPage.css"

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		try {
			await signInWithEmailAndPassword(auth, email, password)
			navigate("/dashboard")
		} catch (err) {
			alert("Login failed")
			console.error(err)
		}
	}

	return (
		<div className="form-wrapper">
			<div className="form-page">
				<h2 style={{ marginBottom: "20px" }}>
					Sign in to use the App
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="form-input--login">
						<label htmlFor="email">Email:</label>
						<input
							className="form-input__box--login"
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="form-input--login">
						<label htmlFor="password">Password:</label>
						<input
							className="form-input__box--login"
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="login-btn__form">
						<button
							className="login-btn"
							type="submit"
						>
							Login
						</button>
					</div>
					<div className="sign-up__link">
						<h5>Don't have an account? </h5>
						<NavLink to="/signup">
							<button className="signup-btn">Sign up here!</button>
						</NavLink>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login
