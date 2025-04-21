import React from "react"

interface Exercise {
	id: number
	name: string
	target: string
	equipment: string
	gifUrl: string
	videos: { title: string; link: string }[]
}

interface UserWorkoutPlanProps {
	exercises: Exercise[]
	handleDelete: (id: number) => void
	handleSave: () => void
}

const UserWorkoutPlan: React.FC<UserWorkoutPlanProps> = ({
	exercises,
	handleDelete,
	handleSave,
}) => {
	if (exercises.length === 0) return null

	return (
		<div style={{ marginTop: "2rem" }}>
			<h3>Your Workout Plan</h3>
			<ul>
				{exercises.map((exercise) => (
					<li key={exercise.id}>
						{exercise.name}{" "}
						<button
							onClick={() => handleDelete(exercise.id)}
							style={{ marginLeft: "1rem" }}
						>
							❌ Remove
						</button>
					</li>
				))}
			</ul>
			<button
				onClick={handleSave}
				style={{
					backgroundColor: "#4CAF50",
					color: "#fff",
					padding: "1rem",
					border: "none",
					borderRadius: "4px",
					cursor: "pointer",
				}}
			>
				Save Changes
			</button>
		</div>
	)
}

export default UserWorkoutPlan
