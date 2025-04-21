import { useContext, useEffect, useState } from "react"
import Exercise from "../interfaces/Exercise"
import WorkoutCard from "../components/WorkoutCard"
import "react-circular-progressbar/dist/styles.css"
import AuthContext from "../context/AuthContext"
import { getUserWorkoutPlan } from "../services/workoutPlanService"
import WorkoutPlan from "../interfaces/WorkoutPlan"
import "../components/WorkoutCard.css"

const ViewWorkout = () => {
	const [workoutPlan, setWorkoutPlan] = useState<Exercise[]>([])
	const [completedWorkouts, setCompletedWorkouts] = useState<
		string[]
	>([])
	const { user } = useContext(AuthContext)

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
					setWorkoutPlan(plans[0].exercises)
				}
			} catch (err) {
				console.error("Error fetching workout plan:", err)
				alert("Could not fetch workout plan")
			}
		}

		if (user) fetchWorkoutPlan()
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
		console.log("Workout completed for:", user?.uid, updatedCompleted)
	}

	return (
		<div className="form-wrapper">
			<div className="form-page">
				<div className="message-boxes">
					<h2 style={{padding: "5px"}}>Today's Focus:</h2>
					<ul>
						<li style={{padding: "5px"}}><u>Strength Training</u>: follow the 12-10-8 rep rule! As move through your sets, add a little weight each time!</li>
						<li style={{padding: "5px"}}><u>Cardio</u>: Aim for at least 20 minutes of cardio. Focus on your breath.</li>
						<li style={{padding: "5px"}}>
							<u>Stretching</u>: Don’t forget to warm up AND cool down with stretches.
						</li>
					</ul>
				</div>
				<br />
				<h3>Your Workout Plan</h3>
				{workoutPlan.length > 0 ? (
					<div
						className="workout-cards--list"
					>
						{workoutPlan.map((exercise) => (
							<div
								key={exercise._id}
								style={{
									opacity: completedWorkouts.includes(exercise._id)
										? 0.5
										: 1,
									position: "relative",
									paddingBottom: "20px"
								}}
							>
								<WorkoutCard
									exercise={exercise}
									addToCart={() => {}}
									showAddButton={false}
								/>
								<button
									onClick={() => handleComplete(exercise._id)}
									style={{
										position: "absolute",
										top: "10px",
										right: "10px",
										color: "#fff",
										border: "none",
										borderRadius: "4px",
										padding: "0.3rem 0.5rem",
										cursor: "pointer",
									}}
								>
									{completedWorkouts.includes(exercise._id)
										? "↩️"
										: "✅"}
								</button>
							</div>
						))}
					</div>
				) : (
					<p>No workout plan available.</p>
				)}
			</div>
		</div>
	)
}

export default ViewWorkout
