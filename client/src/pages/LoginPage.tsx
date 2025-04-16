import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e: FormEvent) => {
        e.preventDefault()

        if (!email || !password) {
            alert("Please enter both email and password")
            return
        }

        localStorage.setItem("userEmail", email)
        navigate("/dashboard")
    }

    return (
        <form onSubmit={handleLogin}>
            <label htmlFor="email">Email: </label>
            <input 
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => (setEmail(e.target.value))}
            />
            <label htmlFor="password">Password: </label>
            <input 
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => (setPassword(e.target.value))}
            />
            <button type="submit">Log in</button>
        </form>
    )
}

export default LoginPage