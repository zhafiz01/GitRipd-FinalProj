import { FC } from "react"
import WorkoutItem from "./WorkoutItem"

const WorkoutPlanList: FC = () => {
    
    return (
        <>
        <li>(.map through all workouts in custom plan)</li>
        <WorkoutItem />
        </>
    )
}

export default WorkoutPlanList