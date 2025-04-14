import { FC } from "react"
import Exercise from "../interfaces/Exercise"

interface WorkoutCardProps {
	exercise: Exercise
	addToCart: (exercise: Exercise) => void
}

const WorkoutCard: FC<WorkoutCardProps> = ({ exercise, addToCart }) => {
	return (
		<div
			style={{
				border: "1px solid #ccc",
				borderRadius: "8px",
				padding: "1rem",
				width: "300px",
				backgroundColor: "#fff",
				boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
				color: "#333",
			}}
		>
			<h3>{exercise.name}</h3>
			<img
				src={exercise.gifUrl.trim()}
				alt={exercise.name}
				style={{
					width: "100%",
					height: "auto",
					borderRadius: "4px",
					marginBottom: "0.5rem",
				}}
			/>
			<p>
				<strong>Target:</strong> {exercise.target}
			</p>
			<p>
				<strong>Equipment:</strong> {exercise.equipment}
			</p>
			{exercise.videos.length > 0 && (
				<div>
					<strong>Videos:</strong>
					<ul style={{ paddingLeft: "1rem" }}>
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
					</ul>
				</div>
			)}
			<button
				onClick={() => addToCart(exercise)}
				style={{
					backgroundColor: "#4CAF50",
					color: "#fff",
					padding: "0.5rem",
					border: "none",
					borderRadius: "4px",
					cursor: "pointer",
				}}
			>
				Add Exercise to Your Workout Plan!
			</button>
		</div>
	)
}

export default WorkoutCard
