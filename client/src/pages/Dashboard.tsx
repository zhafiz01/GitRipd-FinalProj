import { useEffect, useState } from "react"
import Exercise from "../interfaces/Exercise"
//import { useNavigate } from "react-router-dom";
import {
	CircularProgressbar,
	buildStyles,
} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const Dashboard = () => {
	const [workoutPlan, setWorkoutPlan] = useState<Exercise[]>([
		{
			id: 1,
			name: "push ups",
			target: "pectorals",
			equipment: "floor",
			gifUrl: "url",
			videos: [{ title: "vid title", link: "vid link" }],
		},
		{
			id: 2,
			name: "squats",
			target: "glutes",
			equipment: "barbell",
			gifUrl: "url",
			videos: [{ title: "vid title", link: "vid link" }],
		},
		{
			id: 3,
			name: "pull ups",
			target: "biceps",
			equipment: "structure",
			gifUrl: "url",
			videos: [{ title: "vid title", link: "vid link" }],
		},
	])
	//const [userName, setUserName] = useState<string>("User Name"); // Placeholder for user name
	//const navigate = useNavigate();
	const [completedWorkouts, setCompletedWorkouts] = useState<
		number[]
	>([])
	const [progress, setProgress] = useState(0)

	// conditional function for an inspirational/encouraging message to display
	// depending on their specified fitness goal??????

	const getCustomWelcome = (progress: number) => {
		if (progress === 100) return "It's giving BOSS"
		if (progress >= 80) return "You're almost there! Stick with it!"
		if (progress >= 50)
			return "Every day you try is a day you succeed!"
		else return "Let git it!"
	}

	const handleComplete = (id: number) => {
		if (!completedWorkouts.includes(id)) {
			const updatedCompleted = [...completedWorkouts, id]
			setCompletedWorkouts(updatedCompleted)

			const percentage = Math.round(
				(updatedCompleted.length / workoutPlan.length) * 100
			)
			setProgress(percentage)
		}
	}

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

	const handleDelete = async (id: number) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/plans/exercise/${id}`,
				{
					method: "DELETE",
				}
			)

			if (!response.ok) {
				throw new Error("Failed to delete exercise from plan")
			}

			const updatedPlan = await response.json()
			setWorkoutPlan(updatedPlan.exercises)
		} catch (err) {
			console.error("Error deleting exercise:", err)
			alert("❌ Could not delete exercise from plan")
		}
	}

	return (
		<div className="form-wrapper">
			<div className="form-page">
				<h1>User - {getCustomWelcome(progress)}</h1>
				<br />
				<h2>Progress Tracker:</h2>
				<br />
				<div style={{ width: 200, margin: "2rem auto" }}>
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
				<br />
				<h3>Tips for success:</h3>
				<ul>
					<li>Stay consistent with your workouts.</li>
					<li>Focus on form over weight to avoid injury.</li>
					<li>Eat a balanced diet to fuel your gains.</li>
				</ul>
				<br />
				<h3>Today's Focus:</h3>
				<ul>
					<li>Strength Training: Focus on upper body today.</li>
					<li>Cardio: Aim for at least 20 minutes of cardio.</li>
					<li>
						Stretching: Don’t forget to cool down with stretches.
					</li>
				</ul>
				<br />
				<h2>Your Workout Plan</h2>
				{workoutPlan.length > 0 ? (
					<ul>
						{workoutPlan.map((exercise) => (
							<li
								key={exercise.id}
								style={{
									opacity: completedWorkouts.includes(exercise.id)
										? 0.5
										: 1,
								}}
							>
								{exercise.name}{" "}
								{completedWorkouts.includes(exercise.id) && " ✅"}
								<button
									className="mark-complete-button"
									onClick={() => handleComplete(exercise.id)}
								>
									Mark as Complete!
								</button>
								<button
									onClick={() => handleDelete(exercise.id)}
									style={{
										marginLeft: "1rem",
										backgroundColor: "red",
										color: "white",
										border: "none",
										borderRadius: "4px",
										cursor: "pointer",
										padding: "0.3rem 0.5rem",
									}}
								>
									❌ Remove
								</button>
							</li>
						))}
					</ul>
				) : (
					<p>No workout plan available.</p>
				)}
			</div>
		</div>
	)
}

export default Dashboard
