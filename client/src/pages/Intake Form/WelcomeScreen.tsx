import { FC } from "react"
import { NavLink } from "react-router-dom"

const WelcomeScreen: FC = () => {
	return (
		<>
			<h1>Welcome!</h1>
			<br />
			<h5>Ready to kick off your fitness journey in a new way?</h5>
            <br />
            <br />
			<h3>Let's get started!</h3>
            <br />
            <br />
            <NavLink
				to="/name"
				className={({ isActive }) =>
					isActive ? "navlink active" : "navlink"
				}
			>
                <button>Tell Us About Yourself</button>
            </NavLink>
		</>
	)
}

export default WelcomeScreen
