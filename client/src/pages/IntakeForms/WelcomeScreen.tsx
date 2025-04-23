import { NavLink } from "react-router-dom"
import "./WelcomeScreen.css"

const WelcomeScreen = () => {
	return (
		<div className="form-wrapper">
			<div className="form-page--welcome">
				<h1 style={{ fontSize: "48px" }}>Welcome to</h1>
				<h1 style={{ fontSize: "86px"}}>Commit2Fit</h1>
				<h2 style={{ fontSize: "26px", color: "#cfcfcf" }}>
					Ready to kick off your fitness journey
				</h2>
				<h2 style={{ fontSize: "26px", color: "#cfcfcf", marginTop: "0", marginBottom: "0" }}>
					in a new way?
				</h2>
				<br />
				<br />
				<p style={{ fontSize: "22px", fontStyle: "italic" }}>
					Let's get started!
				</p>
				<br />
				<br />
				<div className="user-selection">
					<div className="btn-select">
						<p style={{ fontSize: "18px", color: "#cfcfcf" }}>
							Returning User?
						</p>
						<NavLink to="/login">
							<button className="welcome-btn">Log in</button>
						</NavLink>
					</div>
					<div className="btn-select">
						<p style={{ fontSize: "18px", color: "#cfcfcf" }}>
							First Time?
						</p>
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
