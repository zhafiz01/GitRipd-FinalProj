import { NavLink } from "react-router-dom"
import "./WelcomeScreen.css"
import fitnessSilhouette from "../../assets/images/fitness-silhouette-f-w.png"

const WelcomeScreen = () => {
	return (
		<div className="form-wrapper">
			<div className="form-page--welcome">
				<h1 style={{ fontSize: "54px" }}>Welcome to</h1>
				<h1 style={{ fontSize: "76px" }}>Commit2Fit!</h1>
				<img
					className="fitness-graphic"
					src={fitnessSilhouette}
					alt="welcome-graphic"
				/>
				<h2
					style={{
						fontSize: "26px",
						color: "#cfcfcf",
						maxWidth: "575px",
						marginBottom: "20px",
					}}
				>
					Ready to kick off your fitness journey in a new way?
				</h2>
				<p
					style={{
						fontSize: "22px",
						fontStyle: "italic",
						marginBottom: "30px",
					}}
				>
					Let's get started!
				</p>
				<div className="user-selection">
					<div className="btn-select">
						<p>
							Returning User?
						</p>
						<NavLink to="/login">
							<button className="welcome-btn">Log in</button>
						</NavLink>
					</div>
					<div className="btn-select">
						<p>
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
