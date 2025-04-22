import { FC } from "react"
import WorkoutCard from "./WorkoutCard"
import Exercise from "../interfaces/Exercise"
import "./WorkoutCard.css"

interface WorkoutPlanListProps {
	exercises: Exercise[]
	addToCart: (exercise: Exercise) => void
	showAddButton?: boolean
	showSetsReps?: boolean
}

const WorkoutPlanList: FC<WorkoutPlanListProps> = ({
	exercises,
	addToCart,
	showAddButton,
	showSetsReps,
}) => {
	return (
		<div className="workout--card__container">
			<h2 style={{ marginTop: "30px" }}>Exercise Results</h2>
			{exercises.map((exercise) => (
				<WorkoutCard
					key={exercise.id}
					exercise={exercise}
					addToCart={addToCart}
					showAddButton={showAddButton}
					showSetsReps={showSetsReps}
				/>
			))}
		</div>
	)
}

export default WorkoutPlanList
