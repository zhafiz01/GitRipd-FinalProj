import { useEffect, useState } from "react"
import Exercise from "../interfaces/Exercise"
import WorkoutCard from "../components/WorkoutCard"
import "react-circular-progressbar/dist/styles.css"

const ViewWorkout = () => {
	const [workoutPlan, setWorkoutPlan] = useState<Exercise[]>([
	])

	const [completedWorkouts] = useState<number[]>([])


	useEffect(() => {
		const fetchWorkoutPlan = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_BASE_URL}/api/plans`
				)
				if (!response.ok) {
					throw new Error("Error fetching workout plan")
				}
				const data = await response.json()
				setWorkoutPlan(data.exercises)
			} catch (err) {
				console.error("Error fetching workout plan:", err)
				alert("❌ Could not fetch workout plan")
			}
		}

		fetchWorkoutPlan()
	}, [])

	return (
		<div className="form-wrapper">
			<div className="form-page">
				<h2>Your Workout Plan</h2>
				{workoutPlan.length > 0 ? (
					<div className="workout-list">
						{workoutPlan.map((exercise) => (
							<div
								key={exercise.id}
								style={{
									opacity: completedWorkouts.includes(exercise.id) ? 0.5 : 1,
								}}
							>
								<WorkoutCard exercise={exercise} addToCart={function (_exercise: Exercise): void {
									throw new Error("Function not implemented.")
								} } />
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