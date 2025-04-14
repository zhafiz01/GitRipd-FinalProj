import { FC } from "react"
import MuscleSelector from "../components/MuscleSelector"
import MuscleSelectorPage from "./MuscleSelectorPage"

interface Props {
	onSubmit: (selectedMuscles: string[]) => void
}

const AddWorkout: FC<Props> = ({ onSubmit }) => {
	return (
		<>
			<MuscleSelector onSubmit={onSubmit} />
			<br />
			<h2>Exercises:</h2>
			<br />
			<MuscleSelectorPage />
		</>
	)
}

export default AddWorkout
