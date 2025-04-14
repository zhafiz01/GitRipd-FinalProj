import { FC } from "react"
import MuscleSelector from "../components/MuscleSelector"
import WorkoutListByMuscle from "../components/WorkoutListByMuscle"

const AddWorkout: FC = () => {
    
    return (
        <>
        <MuscleSelector />
        <br/>
        <h2>Exercises:</h2>
        <br/>
        <WorkoutListByMuscle />
        </>
    )
}

export default AddWorkout