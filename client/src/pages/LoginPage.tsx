import { FormEvent, useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../utils/firebase"
import { Link, useNavigate } from "react-router-dom"
import "./IntakeForms/WelcomeScreen.css"

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
        <div>
            <h2>Sign in to use the App</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">
                    Login
                </button>
                <p>Don't have an account? <Link to="/signup">Sign up here!</Link></p>
            </form>
        </div>
    )
}

export default Login