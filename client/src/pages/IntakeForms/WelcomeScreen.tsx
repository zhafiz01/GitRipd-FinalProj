import { NavLink } from "react-router-dom"
import "./WelcomeScreen.css"

const WelcomeScreen = () => {
	return (
		<div className="form-wrapper">
			<div className="form-page--welcome">
				<p style={{ fontSize: "56px" }}>Welcome to GiTRiPD!</p>
				<br />
				<p style={{ fontSize: "36px" }}>
					Ready to kick off your fitness journey in a new way?
				</p>
				<br />
				<br />
				<p style={{ fontSize: "26px", fontStyle: "italic" }}>
					Let's get started!
				</p>
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
						<NavLink to="/signup">
							<button className="welcome-btn">
								Create an Account!
							</button>
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	)
}

export default WelcomeScreen
