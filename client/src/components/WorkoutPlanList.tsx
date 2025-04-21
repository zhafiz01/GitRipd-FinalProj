import { FC } from "react"
import WorkoutCard from "./WorkoutCard"
import Exercise from "../interfaces/Exercise"
import "./WorkoutCard.css"

interface WorkoutPlanListProps {
	exercises: Exercise[] // array of elements of type Exercise
	addToCart: (exercise: Exercise) => void // function that has one param and returns nothing
	showAddButton?: boolean
}

const WorkoutPlanList: FC<WorkoutPlanListProps> = ({
	exercises,
	addToCart,
	showAddButton,
}) => {
	return (
		<div className="workout--card__container">
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

export default WorkoutPlanList
