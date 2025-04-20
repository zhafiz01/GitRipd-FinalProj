import Exercise from "./Exercise"

export default interface WorkoutPlan {
    _id: string
    userId: string
    exercises: Exercise[]
}