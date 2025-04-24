import { useContext, useEffect, useState } from "react"
import Exercise from "../interfaces/Exercise"
import WorkoutCard from "../components/WorkoutCard"
import AuthContext from "../context/AuthContext"
import { getUserWorkoutPlan } from "../services/workoutPlanService"
import WorkoutPlan from "../interfaces/WorkoutPlan"
import "./ViewWorkout.css"
import { useNavigate } from "react-router-dom"
import fitnessSilhouette from "../assets/images/fitness-silhouette-m-dg.png"

const ViewWorkout = () => {
	const [workoutPlan, setWorkoutPlan] = useState<Exercise[]>([])
	const [completedWorkouts, setCompletedWorkouts] = useState<
		string[]
	>([])
	const [setsReps, setSetsReps] = useState<
		Record<string, { sets: string; reps: string }>
	>({})
	const { user } = useContext(AuthContext)
	const navigate = useNavigate()

	useEffect(() => {
		const today = new Date().toDateString()
		const completedKey = `completedWorkouts_${user?.uid}`
		const dateKey = `lastResetDate_${user?.uid}`
		const savedDate = localStorage.getItem(dateKey)

		if (savedDate !== today) {
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

					const initialSetsReps: Record<
						string,
						{ sets: string; reps: string }
					> = {}
					plans[0].exercises.forEach((ex) => {
						initialSetsReps[ex._id] = { sets: "4", reps: "12" }
					})
					setSetsReps(initialSetsReps)
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
		} else {
			updatedCompleted = [...completedWorkouts, id]
		}
		setCompletedWorkouts(updatedCompleted)
		localStorage.setItem(
			completedKey,
			JSON.stringify(updatedCompleted)
		)
	}

	const handleSetsRepsChange = (
		id: string,
		field: "sets" | "reps",
		value: string
	) => {
		setSetsReps((prev) => ({
			...prev,
			[id]: {
				...prev[id],
				[field]: value,
			},
		}))
	}

	const handleClick = () => {
		navigate("/select")
	}

	return (
		<div className="view-workout--wrapper">
			<div className="message-boxes">
				<h1>
					Your future self will thank you for the work you put in
					today!
				</h1>
			</div>
			{workoutPlan.length > 0 ? (
				<div>
					<div className="message-boxes">
						<h2 style={{ color: "#1ed490", marginBottom: "20px" }}>
							Today's Focus:
						</h2>
						<ul>
							<li style={{ padding: "5px" }}>
								<u>Strength Training</u>: follow the 12-10-8 rep rule!
								As you go, decrease reps and increase weight!
							</li>
							<li style={{ padding: "5px" }}>
								<u>Cardio</u>: Warm up with at least 20 minutes of
								cardio. Focus on your breath.
							</li>
							<li style={{ padding: "5px" }}>
								<u>Stretching</u>: Don’t forget to warm up AND cool
								down with stretches.
							</li>
						</ul>
					</div>
					{workoutPlan.map((exercise) => (
						<div
							className="workout-cards--list"
							key={exercise._id}
							style={{
								opacity: completedWorkouts.includes(exercise._id)
									? 0.5
									: 1,
								position: "relative",
							}}
						>
							<WorkoutCard
								exercise={exercise}
								addToCart={() => {}}
								showAddButton={false}
								showSetsReps={true}
								sets={setsReps[exercise._id]?.sets || "4"}
								reps={setsReps[exercise._id]?.reps || "12"}
								onSetsRepsChange={handleSetsRepsChange}
							/>
							<button
								className="complete-workout-btn"
								onClick={() => handleComplete(exercise._id)}
							>
								{completedWorkouts.includes(exercise._id)
									? "↩️"
									: "✅"}
							</button>
						</div>
					))}
				</div>
			) : (
				<div className="no-plan">
					<img
						className="fitness-graphic__view"
						src={fitnessSilhouette}
						alt="vw-graphic"
					/>
					<p>
						<button
							className="plans-to-select-btn"
							onClick={handleClick}
						>
							Click Here
						</button>
						to build your own workout routine!
					</p>
				</div>
			)}
		</div>
	)
}

export default ViewWorkout
