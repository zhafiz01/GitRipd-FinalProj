import { FC, useEffect, useState } from "react"
import Exercise from "../interfaces/Exercise"
import "./WorkoutCard.css"

interface WorkoutCardProps {
	exercise: Exercise
	addToCart: (exercise: Exercise) => void
	showAddButton?: boolean
	showSetsReps?: boolean
	sets?: string
	reps?: string
	onSetsRepsChange?: (id: string, field: "sets" | "reps", value: string) => void
}

const WorkoutCard: FC<WorkoutCardProps> = ({
	exercise,
	addToCart,
	showAddButton,
	showSetsReps
}) => {
	const storageKey = `setsReps_${exercise._id}`

	const [sets, setSets] = useState("4")
	const [reps, setReps] = useState("12")

	useEffect(() => {
		const saved = localStorage.getItem(storageKey)
		if (saved) {
			const parsed = JSON.parse(saved)
			setSets(parsed.sets || "")
			setReps(parsed.reps || "")
		}
	}, [exercise._id])

	const handleChange = (type: "sets" | "reps", value: string) => {
		if (type === "sets") setSets(value)
		else setReps(value)

		
		const setSetsReps = {
			sets: type === "sets" ? value : sets,
			reps: type === "reps" ? value : reps,
		}
		localStorage.setItem(storageKey, JSON.stringify(setSetsReps))
	}

	return (
		<div className="workout-card">
			<div className="name-sets-reps" style={{ width: "40%", paddingRight: "30px", textAlign: "center" }}>
				<h2>{exercise.name}</h2>
				<div>
					{showSetsReps && (
						<div className="sets-reps-wrapper">
						<label style={{ color: "#fff" }}>
						Sets:
						<input
							type="number"
							value={sets}
							onChange={(e) => handleChange("sets", e.target.value)}
							style={{
								marginLeft: "8px",
								padding: "4px 8px",
								borderRadius: "5px",
								width: "60px",
							}}
						/>
					</label>
					<label style={{ color: "#fff" }}>
						Reps:
						<input
							type="number"
							value={reps}
							onChange={(e) => handleChange("reps", e.target.value)}
							style={{
								marginLeft: "8px",
								padding: "4px 8px",
								borderRadius: "5px",
								width: "60px"
							}}
						/>
					</label>
					</div>
					)}
				</div>
			</div>
			<div>
				<img
					className="workout--card__image"
					src={exercise.gifUrl.trim()}
					alt={exercise.name}
				/>
			</div>
			<div className="workout-card--description">
				<p>
					<strong>Target:</strong> {exercise.target}
				</p>
				<br />
				<p>
					<strong>Equipment:</strong> {exercise.equipment}
				</p>
				<br />
				{exercise.videos.length > 0 && (
					<div className="video-urls">
						<p>
							<strong>Videos:</strong>
						</p>
						<ul className="vid-list" style={{ marginTop: "5px" }}>
							{exercise.videos.slice(0, 2).map((vid, i) => (
								<li key={i}>
									<a
										href={vid.link}
										target="_blank"
										rel="noopener noreferrer"
									>
										{vid.title}
									</a>
								</li>
							))}
							<br />
						</ul>
					</div>
				)}
			</div>
			<div>
				{showAddButton && (
					<button
						className="add-exercise-btn"
						onClick={() => addToCart(exercise)}
					>
						Add Exercise
					</button>
				)}
			</div>
		</div>
	)
}

export default WorkoutCard