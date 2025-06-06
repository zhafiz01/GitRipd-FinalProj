import { useState } from "react"
import MuscleSelector from "../components/MuscleSelector"
import WorkoutPlanList from "../components/WorkoutPlanList"
import { useNavigate } from "react-router-dom"
import Exercise from "../interfaces/Exercise"
import { saveUserWorkoutPlan } from "../services/workoutPlanService"
import "./MuscleSelector.css"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Lottie from "lottie-react"
import treadmillAnimation from "../assets/animations/treadmill.json"

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
	const [isLoading, setIsLoading] = useState(false)
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

		setIsLoading(true)

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

			setTimeout(() => {
				setExercises(allExercises)
				setIsLoading(false)
				console.log("✅ Fetched exercises:", allExercises)
			}, 1500)
		} catch (error) {
			console.error("❌ Error fetching exercises:", error)
			setIsLoading(false)
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
			navigate("/plans")
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

			<h6
				style={{ backgroundColor: "#cfcfcf", paddingBottom: "20px" }}
			>
				Selected:{" "}
				{selectedTargets
					.filter(
						(m) => m !== "Front-Muscles" && m !== "Back-Muscles"
					)
					.join(", ")}
			</h6>

			{isLoading && (
				<div className="treadmill-loader">
					<Lottie animationData={treadmillAnimation} loop={true} style={{ width: 300 }} />
				</div>
			)}

			{cart.length > 0 && (
				<div className="muscle-selector-page--cart">
					<h3
						style={{
							color: "#0b0c0c",
							marginBottom: "8px",
							textDecoration: "underline",
						}}
					>
						Your Exercises
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
					<div style={{ display: "flex", justifyContent: "center" }}>
						<button className="save-plan-btn" onClick={handleSave}>
							Save to Workout Plan
						</button>
						<button className="clear-cart-btn" onClick={() => setCart([])}>
							Clear All
						</button>
					</div>
				</div>
			)}

			<div className="workout-cards--container">
				{exercises.length > 0 && (
					<WorkoutPlanList
						exercises={exercises}
						addToCart={addToCart}
						showAddButton={true}
						showSetsReps={false}
					/>
				)}
			</div>
		</div>
	)
}

export default MuscleSelectorPage