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
		<div className="workout-card"
			style={{
				borderRadius: "8px",
				padding: "1rem",
				width: "100%",
				backgroundColor: "#141414",
				border: "5px solid var(--dark-green)",
				boxShadow: "0px 0px 20px #024433",
				color: "#fff",
			}}
		>
			<h2 style={{paddingRight: "30px", width: "40%"}}>{exercise.name}</h2> 
			<div>
				<img
					src={exercise.gifUrl.trim()}
					alt={exercise.name}
					style={{
						width: "80%",
						height: "auto",
						borderRadius: "4px",
						marginBottom: "0.5rem",
					}}
				/>
			</div>
			<div className="workout-card--description"
				style={{width: "40%"}}
			>
				<h6 style={{color: "#fff"}}>
					<strong>Target:</strong> {exercise.target}
				</h6>
				<h6 style={{color: "#fff"}}>
					<strong>Equipment:</strong> {exercise.equipment}
				</h6>
				{exercise.videos.length > 0 && (
					<div>
						<h6 style={{color: "#fff"}}>
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
