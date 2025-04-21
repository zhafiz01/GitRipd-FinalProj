import { FC } from "react"
import WorkoutCard from "./WorkoutCard"
import Exercise from "../interfaces/Exercise"
import "./WorkoutCard.css"

interface WorkoutPlanListProps {
	exercises: Exercise[]
	addToCart: (exercise: Exercise) => void
	showAddButton?: boolean
}

const WorkoutList: FC<WorkoutPlanListProps> = ({
	exercises,
	addToCart,
	showAddButton,
}) => {
	return (
		<div
			className="workout-plan--cards__list"
			style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
		>
			{exercises.map((exercise) => (
				<WorkoutCard
					key={exercise.id}
					exercise={exercise}
					addToCart={addToCart}
					showAddButton={showAddButton}
				/>
			))}
		</div>
	)
}

export default WorkoutList
