import { useState } from "react"
import MuscleSelector from "../components/MuscleSelector"
import WorkoutPlanList from "../components/WorkoutPlanList"
import { useNavigate } from "react-router-dom"
import Exercise from "../interfaces/Exercise"
import { saveUserWorkoutPlan } from "../services/workoutPlanService"
import "./MuscleSelector.css"

const targetIdToZylaName: Record<string, string> = {
	Pectorals: "pectorals",
	Triceps: "triceps",
	Biceps: "biceps",
	Deltoids: "delts",
	Lats: "lats",
	Trapezius: "traps",
	Abs: "abs",
	Obliques: "serratus anterior",
	Quads: "quads",
	Hamstrings: "hamstrings",
	Calves: "calves",
	Glutes: "glutes",
	Forearms: "forearms",
	Adductors: "adductors",
	// "Front-Muscles": "",
	// "Back-Muscles": "",
	Front: "",
	Back: "",
}

const MuscleSelectorPage = () => {
	const [selectedTargets, setSelectedTargets] = useState<string[]>([])
	const [exercises, setExercises] = useState<Exercise[]>([])
	const [cart, setCart] = useState<Exercise[]>([])
	const navigate = useNavigate()

	const toggleMuscle = (target: string) => {
		setSelectedTargets((prev) =>
			prev.includes(target)
				? prev.filter((m) => m !== target)
				: [...prev, target]
		)
	}

	const handleSubmit = async () => {
		const translatedTargets = selectedTargets
			.map((m) => targetIdToZylaName[m])
			.filter((name) => !!name)

		setExercises([])

		if (translatedTargets.length === 0) return

		try {
			const allExercises: Exercise[] = []

			for (const target of translatedTargets) {
				const response = await fetch(
					`${import.meta.env.VITE_API_BASE_URL}/exercises/${target}`
				)
				const data = await response.json()

				if (!Array.isArray(data)) {
					console.error("❌ API response is not an array:", data)
					continue
				}

				const filtered = data.filter(
					(ex) => !ex.name.toLowerCase().startsWith("assisted")
				)
				allExercises.push(...filtered.slice(0, 8))
			}

			setExercises(allExercises)
			console.log("✅ Fetched exercises:", allExercises)
		} catch (error) {
			console.error("❌ Error fetching exercises:", error)
		}
	}

	const addToCart = (exercise: Exercise) => {
		const normalized = {
		  ...exercise,
		  _id: exercise._id || exercise.id?.toString() || crypto.randomUUID()
		}
	  
		setCart(prevCart =>
		  prevCart.find(e => e._id === normalized._id)
			? prevCart
			: [...prevCart, normalized]
		)
	  }

	const handleDelete = (_id: string) => {
		setCart(prevCart =>
			prevCart.filter(exercise => exercise._id !== _id)

		)
	}

	const handleSave = async () => {
		try {
			await saveUserWorkoutPlan(cart)
			console.log("✅ Workout plan saved!")
			navigate("/dashboard")
		} catch (err) {
			console.error("Save error:", err)
			alert("Could not save workout plan.")
		}
	}

	return (
		<div className="form-page--muscle">
			<MuscleSelector
				selectedTargets={selectedTargets}
				toggleMuscle={toggleMuscle}
				onSubmit={handleSubmit}
			/>

			<p>
				Selected:{" "}
				{selectedTargets
					.filter(
						(m) => m !== "Front-Muscles" && m !== "Back-Muscles"
					)
					.join(", ")}
			</p>
			{cart.length > 0 && (
				<div className="workout-plan__list">
					<h2>Your Workout Plan</h2>
					<ul>
						{cart.map(exercise => (
							<li key={exercise._id}>
								{exercise.name}
								<button onClick={() => handleDelete(exercise._id)}>
									Delete
								</button>
							</li>
						))}
					</ul>
					<button onClick={handleSave}>Save to Workout Plan</button>
				</div>
			)}

			{exercises.length > 0 && (
				<div>
					<h2>Exercise Results</h2>
					<WorkoutPlanList
						exercises={exercises}
						addToCart={addToCart}
						showAddButton={true}
					/>
				</div>
			)}
		</div>
	)
}

export default MuscleSelectorPage
