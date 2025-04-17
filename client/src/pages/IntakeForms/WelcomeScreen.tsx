import { NavLink } from "react-router-dom"
import "./IntakeForms.css"

const WelcomeScreen = () => {
	return (
		<div className="form-page">
			<p style={{ fontSize: "56px" }}>
				Welcome to GiTRiPD!
			</p>
			<br />
			<p style={{ fontSize: "36px" }}>Ready to kick off your fitness journey in a new way?</p>
			<br />
			<br />
			<p style={{ fontSize: "26px", fontStyle: "italic"}}>Let's get started!</p>
			<br />
			<br />
			<div className="user-selection">
				<div className="btn-select">
					<p style={{ fontSize: "18px" }}>Returning User?</p>
					<NavLink to="/login">
						<button className="welcome-btn">Log in</button>
					</NavLink>
				</div>
				<div className="btn-select">
					<p style={{ fontSize: "18px" }}>First Time?</p>
					<NavLink to="/name">
						<button className="welcome-btn">Create an Account!</button>
					</NavLink>
				</div>
			</div>
		</div>
	)
}

export default WelcomeScreen
