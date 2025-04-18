import { useState } from "react"
import MuscleSelector from "../components/MuscleSelector"
import WorkoutPlanList from "../components/WorkoutPlanList"
import { useNavigate } from "react-router-dom"
import Exercise from "../interfaces/Exercise"

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
	Back: ""
}

const MuscleSelectorPage = () => {
	const [selectedTargets, setSelectedTargets] =
		useState<string[]>([])
	const [exercises, setExercises] = useState<
		Exercise[]
	>([])
	const [cart, setCart] = useState<Exercise[]>([])
	const navigate = useNavigate()

	const toggleMuscle = (target: string) => {
		setSelectedTargets(prev =>
			prev.includes(target)
				? prev.filter(m => m !== target)
				: [...prev, target]
		)
	}

	const handleSubmit = async () => {
		const translatedTargets = selectedTargets
			.map(m => targetIdToZylaName[m])
			.filter(name => !!name)

		setExercises([])

		if (translatedTargets.length === 0) return

		try {
			const allExercises: Exercise[] = []

			for (const target of translatedTargets) {
				const response = await fetch(
					`${
						import.meta.env.VITE_API_BASE_URL
					}/exercises/${target}`
				)
				const data = await response.json()

				if (!Array.isArray(data)) {
					console.error(
						"❌ API response is not an array:",
						data
					)
					continue
				}

				const filtered = data.filter(
					ex =>
						!ex.name
							.toLowerCase()
							.startsWith("assisted")
				)
				allExercises.push(...filtered.slice(0, 8))
			}

			setExercises(allExercises)
			console.log(
				"✅ Fetched exercises:",
				allExercises
			)
		} catch (error) {
			console.error(
				"❌ Error fetching exercises:",
				error
			)
		}
	}

	const addToCart = (exercise: Exercise) => {
		setCart(prevCart => [...prevCart, exercise])
	}

	const handleDelete = (id: number) => {
		setCart(prevCart =>
			prevCart.filter(exercise => exercise.id !== id)
		)
	}

	const handleSave = async () => {
		try {
			const userEmail =
				localStorage.getItem("userEmail")
			if (!userEmail) {
				alert("❌ User not logged in.")
				return
			}

			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/plans`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						userId: userEmail,
						exercises: cart
					})
				}
			)

			if (!response.ok)
				throw new Error("Failed to save workout plan")

			const saved = await response.json()
			console.log("✅ Saved Plan:", saved)
			alert("✅ Workout plan saved!")
			navigate("/dashboard")
		} catch (err) {
			console.error("❌ Save error:", err)
			alert("❌ Could not save workout plan.")
		}
	}

	return (
		<div
			style={{
				padding: "1rem",
				fontFamily: "Arial, sans-serif",
				backgroundColor: "#f0f2f5",
				color: "#222",
				minHeight: "100vh"
			}}
		>
			{/* <h1 style={{ textAlign: "center", color: "#111" }}>Workout Planner</h1> */}

			{/* Pass selectedMuscles and toggleMuscle as props */}
			<MuscleSelector
				selectedTargets={selectedTargets}
				toggleMuscle={toggleMuscle}
				onSubmit={handleSubmit}
			/>

			<p
				style={{
					marginTop: "1rem",
					fontWeight: "bold"
				}}
			>
				Selected:{" "}
				{selectedTargets
					.filter(
						m =>
							m !== "Front-Muscles" &&
							m !== "Back-Muscles"
					)
					.join(", ")}
			</p>
			{cart.length > 0 && (
				<div>
					<h2 style={{ marginTop: "2rem" }}>
						Your Workout Plan
					</h2>
					<ul>
						{cart.map(exercise => (
							<li key={exercise.id}>
								{exercise.name}
								<button
									onClick={() =>
										handleDelete(exercise.id)
									}
									style={{
										backgroundColor: "#f44336",
										color: "#fff",
										padding: "0.5rem",
										border: "none",
										borderRadius: "4px",
										cursor: "pointer",
										marginLeft: "1rem"
									}}
								>
									Delete
								</button>
							</li>
						))}
					</ul>
					<button
						onClick={handleSave}
						style={{
							backgroundColor: "#4CAF50",
							color: "#fff",
							padding: "1rem",
							border: "none",
							borderRadius: "4px",
							cursor: "pointer",
							marginTop: "1rem"
						}}
					>
						Save to Workout Plan
					</button>
				</div>
			)}

			{exercises.length > 0 && (
				<div>
					<h2
						style={{
							marginTop: "2rem",
							marginBottom: "1rem"
						}}
					>
						Exercise Results
					</h2>
					<WorkoutPlanList
						exercises={exercises}
						addToCart={addToCart}
					/>
				</div>
			)}
		</div>
	)
}

export default MuscleSelectorPage
