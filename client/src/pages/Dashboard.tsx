import { useContext, useEffect, useState } from "react"
import Exercise from "../interfaces/Exercise"
import {
	CircularProgressbar,
	buildStyles,
} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import {
	deleteExerciseFromPlan,
	getUserWorkoutPlan,
} from "../services/workoutPlanService"
import WorkoutPlan from "../interfaces/WorkoutPlan"
import AuthContext from "../context/AuthContext"
import { useIntakeForm } from "../context/IntakeFormContext"
import "./Dashboard.css"
import { getUserProfile } from "../services/userService"
import User from "../interfaces/User"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
	const [exercises, setExercises] = useState<Exercise[]>([])
	const [completedWorkouts, setCompletedWorkouts] = useState<
		string[]
	>([])
	const [progress, setProgress] = useState(0)
	const { user, token, isLoading } = useContext(AuthContext)
	const { data } = useIntakeForm()
	const [profile, setProfile] = useState<User | null>(null)
	const navigate = useNavigate()

	const getCustomWelcome = (progress: number) => {
		if (progress === 100)
			return (
				<>
					Beast mode!{" "}
					<span style={{ color: "#0e6b53", fontSize: "35px" }}>
						Commit
					</span>{" "}
					to a break, you’ve earned it.
				</>
			)
		if (progress >= 80)
			return (
				<>
					<span style={{ color: "#0e6b53", fontSize: "35px" }}>
						Push
					</span>{" "}
					a little further - you're crushing it!
				</>
			)
		if (progress >= 50)
			return (
				<>
					You're halfway there and already looking
					<span style={{ color: "#0e6b53", fontSize: "35px" }}>
						{" "}
						full-stack
					</span>
					ed!
				</>
			)
		if (progress >= 30)
			return (
				<>
					<span style={{ color: "#0e6b53", fontSize: "35px" }}>
						Compile
					</span>{" "}
					that energy and keep at it!
				</>
			)
		else
			return (
				<>
					Ready?{" "}
					<span style={{ color: "#0e6b53", fontSize: "35px" }}>
						Get setter?{" "}
					</span>
					Let's Git It!
				</>
			)
	}

	useEffect(() => {
		const today = new Date().toDateString()
		const completedKey = `completedWorkouts_${user?.uid}`
		const dateKey = `lastResetDate_${user?.uid}`
		const savedDate = localStorage.getItem(dateKey)

		if (savedDate !== today) {
			console.log("New day — resetting workout completion")
			localStorage.setItem(dateKey, today)
			localStorage.removeItem(completedKey)
			setCompletedWorkouts([])
			setProgress(0)
		} else {
			const savedCompleted = localStorage.getItem(completedKey)
			if (savedCompleted) {
				const parsed = JSON.parse(savedCompleted)
				setCompletedWorkouts(parsed)
			}
		}

		const fetchWorkoutPlan = async () => {
			try {
				const plans: WorkoutPlan[] = await getUserWorkoutPlan()
				if (plans.length > 0) {
					setExercises(plans[0].exercises)

					const savedCompleted = localStorage.getItem(completedKey)
					if (savedCompleted) {
						const parsed = JSON.parse(savedCompleted)
						const percentage = Math.round(
							(parsed.length / plans[0].exercises.length) * 100
						)
						setProgress(percentage)
					}
				}
			} catch (err) {
				console.error("Error fetching workout plan:", err)
				alert("Could not fetch workout plan")
			}
		}

		fetchWorkoutPlan()

		const fetchProfile = async () => {
			try {
				const userData = await getUserProfile()
				setProfile(userData as User)
			} catch (err) {
				console.error("Failed to load profile:", err)
			}
		}

		fetchProfile()
	}, [user])

	const handleComplete = (id: string) => {
		const completedKey = `completedWorkouts_${user?.uid}`
		let updatedCompleted: string[] = []
		if (completedWorkouts.includes(id)) {
			updatedCompleted = completedWorkouts.filter(
				(exId) => exId !== id
			)
		} else updatedCompleted = [...completedWorkouts, id]

		setCompletedWorkouts(updatedCompleted)
		localStorage.setItem(
			completedKey,
			JSON.stringify(updatedCompleted)
		)

		const percentage = Math.round(
			(updatedCompleted.length / exercises.length) * 100
		)
		setProgress(percentage)
		console.log("Workout completed for:", user?.uid, updatedCompleted)
	}

	const handleDelete = async (id: string) => {
		try {
			if (!token) throw new Error("No token available")
			const updated = await deleteExerciseFromPlan(id, token)

			setExercises(updated.exercises)

			const updatedCompleted = completedWorkouts.filter(
				(exId) => exId !== id
			)
			setCompletedWorkouts(updatedCompleted)
			localStorage.setItem(
				`completedWorkouts_${user?.uid}`,
				JSON.stringify(updatedCompleted)
			)

			const percentage = Math.round(
				(updatedCompleted.length / updated.exercises.length) * 100
			)
			setProgress(percentage)
		} catch (err) {
			console.error("Error deleting exercise:", err)
			alert("Could not delete exercise from plan")
		}
	}

	const handleClick = () => {
		navigate("/select")
	}

	if (isLoading || !user) return <div>Loading user data...</div>

	const displayData = profile || data

	return (
		<div className="form-wrapper--dashboard">
			<div className="form-page--dashboard">
				<h1 style={{ marginBottom: "15px" }}>
					Hey{" "}
					<span style={{ color: "#1ed490" }}>{displayData.name}</span>
					!
				</h1>
				{exercises.length === 0 ? (
					<div className="no-plan">
						<h3 style={{ marginBottom: "15px" }}>
							You’ve already made the decision to start, and that’s
							what matters!
						</h3>

						<button
							className="to-select-btn"
							onClick={handleClick}
						>
							Click Here
						</button>
						<p>to start building your own workout routine!</p>
					</div>
				) : (
					<div>
						<h2 className="custom-message">
							{getCustomWelcome(progress)}
						</h2>
						<h2>Progress Tracker:</h2>
						<div style={{ width: "200px", margin: "2rem auto" }}>
							<CircularProgressbar
								value={progress}
								text={`${progress}%`}
								styles={buildStyles({
									textSize: "16px",
									pathColor:
										progress >= 80
											? "#4caf50"
											: progress >= 50
											? "#f4c542"
											: "#00bcd4",
									textColor: "#333",
									trailColor: "#ddd",
								})}
							/>
						</div>
						<div className="message-boxes">
							<h3 style={{ textDecoration: "underline" }}>
								Tips for success:
							</h3>
							<ul>
								<li className="tips">
									• Stay consistent with your workouts.
								</li>
								<li className="tips">
									• Focus on form over weight to avoid injury.
								</li>
								<li className="tips">
									• Eat a balanced diet to fuel your gains.
								</li>
							</ul>
						</div>
						<h2 style={{ marginBottom: "10px" }}>
							Your Workout Plan
						</h2>
						<div className="workout-plan--dashboard">
							<ul>
								{exercises.map((exercise) => (
									<li
										className="workout-list--dashboard"
										key={exercise._id}
										style={{
											opacity: completedWorkouts.includes(
												exercise._id
											)
												? 0.5
												: 1,
										}}
									>
										{exercise.name}{" "}
										<div className="dashboard-btns">
											<button
												className="dashboard-btns--mark-complete"
												onClick={() => handleComplete(exercise._id)}
											>
												{completedWorkouts.includes(exercise._id)
													? "↩️"
													: "✅"}
											</button>
											<button
												onClick={() => handleDelete(exercise._id)}
											>
												<FontAwesomeIcon
													icon={faTrashCan}
													size="sm"
													color="grey"
												/>
											</button>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Dashboard
