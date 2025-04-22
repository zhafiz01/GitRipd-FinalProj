import { useState } from "react"
import MuscleSelector from "../components/MuscleSelector"
import WorkoutPlanList from "../components/WorkoutPlanList"
import { useNavigate } from "react-router-dom"
import Exercise from "../interfaces/Exercise"
import { saveUserWorkoutPlan } from "../services/workoutPlanService"
import "./MuscleSelector.css"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
			_id:
				exercise._id ||
				exercise.id?.toString() ||
				crypto.randomUUID(),
		}

		setCart((prevCart) =>
			prevCart.find((e) => e._id === normalized._id)
				? prevCart
				: [...prevCart, normalized]
		)
	}

	const handleDelete = (_id: string) => {
		setCart((prevCart) =>
			prevCart.filter((exercise) => exercise._id !== _id)
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
		<div className="muscle-selector-page--wrapper">
			<MuscleSelector
				selectedTargets={selectedTargets}
				toggleMuscle={toggleMuscle}
				onSubmit={handleSubmit}
			/>

			<h6 style={{ backgroundColor: "#cfcfcf" }}>
				Selected:{" "}
				{selectedTargets
					.filter(
						(m) => m !== "Front-Muscles" && m !== "Back-Muscles"
					)
					.join(", ")}
			</h6>
			{cart.length > 0 && (
				<div className="muscle-selector-page--cart">
					<h3 style={{ color: "#0b0c0c", marginBottom: "8px" }}>
						Add New Exercises to your Workout Plan!
					</h3>
					<ul>
						{cart.map((exercise) => (
							<li key={exercise._id}>
								{exercise.name}
								<button
									className="workout-delete-btn"
									onClick={() => handleDelete(exercise._id)}
								>
									<FontAwesomeIcon
										icon={faTrashCan}
										size="sm"
										color="grey"
									/>
								</button>
							</li>
						))}
					</ul>
					<button
						className="save-plan-btn"
						onClick={handleSave}
					>
						Save to Workout Plan
					</button>
				</div>
			)}
			<div className="workout-cards--list">
				<h2 style={{ marginTop: "30px" }}>Exercise Results</h2>
				{exercises.length > 0 && (
					<WorkoutPlanList
						exercises={exercises}
						addToCart={addToCart}
						showAddButton={true}
					/>
				)}
			</div>
		</div>
	)
}

export default MuscleSelectorPage
