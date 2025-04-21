import { FC } from "react"
import Exercise from "../interfaces/Exercise"
import "./WorkoutCard.css"

interface WorkoutCardProps {
	exercise: Exercise
	addToCart: (exercise: Exercise) => void
	showAddButton?: boolean
}

const WorkoutCard: FC<WorkoutCardProps> = ({
	exercise,
	addToCart,
	showAddButton,
}) => {
	return (
		<div
			style={{
				borderRadius: "8px",
				padding: "1rem",
				width: "300px",
				backgroundColor: "#fff",
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

			<div className="workout--card">
				<h6>
					<strong>Target:</strong> {exercise.target}
				</h6>
				<h6>
					<strong>Equipment:</strong> {exercise.equipment}
				</h6>
				{exercise.videos.length > 0 && (
					<div>
						<h6>
							<strong>Videos:</strong>
						</h6>
						<ul style={{ paddingLeft: "1rem", marginTop: "5px" }}>
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
