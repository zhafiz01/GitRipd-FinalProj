import { useState } from "react"

interface MuscleSelectorProps {
	onSubmit: (selectedMuscles: string[]) => void
}

const MuscleSelector = ({ onSubmit }: MuscleSelectorProps) => {
	const [selectedMuscles, setSelectedMuscles] = useState<string[]>([])

	const toggleMuscle = (muscle: string) => {
		setSelectedMuscles((prev) =>
			prev.includes(muscle)
				? prev.filter((m) => m !== muscle)
				: [...prev, muscle]
		)
	}

	const handleSubmit = () => {
		onSubmit(selectedMuscles)
	}

	const muscleGroups = {
		Arms: ["biceps", "delts", "forearms", "triceps"],
		Back: ["trapezius", "lats"],
		Core: ["abs", "pectorals"],
		Legs: ["adductors", "calves", "hamstrings", "glutes", "quads"],
	}

	return (
		<div>
			<h2>Select Muscle Groups</h2>
			{Object.entries(muscleGroups).map(([group, muscles]) => (
				<div key={group}>
					<h3>{group}</h3>
					{muscles.map((muscle) => (
						<label
							key={muscle}
							style={{ display: "block", marginBottom: "4px" }}
						>
							<input
								type="checkbox"
								checked={selectedMuscles.includes(muscle)}
								onChange={() => toggleMuscle(muscle)}
							/>
							{muscle.charAt(0).toUpperCase() + muscle.slice(1)}
						</label>
					))}
				</div>
			))}

			<button onClick={handleSubmit}>Submit Selection</button>
		</div>
	)
}

export default MuscleSelector

/*import { useState } from "react"

interface MuscleSelectorProps {
  onSubmit: (selectedMuscles: string[]) => void
}

const MuscleSelector = ({ onSubmit }: MuscleSelectorProps) => {
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([])

  const toggleMuscle = (muscle: string) => {
    setSelectedMuscles(prev =>
      prev.includes(muscle)
        ? prev.filter(m => m !== muscle)
        : [...prev, muscle]
    )
  }

  const handleSubmit = () => {
    onSubmit(selectedMuscles)
  }

  const muscleGroups = {
    Arms: ["biceps", "delts", "forearms", "triceps"],
    Back: ["trapezius", "lats"],
    Core: ["abs", "pectorals"],
    Legs: ["adductors", "calves", "hamstrings", "glutes", "quads"],
  }

  return (
    <div>
      <h2>Select Muscle Groups</h2>
      {Object.entries(muscleGroups).map(([group, muscles]) => (
        <div key={group}>
          <h3>{group}</h3>
          {muscles.map(muscle => (
            <label key={muscle} style={{ display: "block", marginBottom: "4px" }}>
              <input
                type="checkbox"
                checked={selectedMuscles.includes(muscle)}
                onChange={() => toggleMuscle(muscle)}
              />
              {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
            </label>
          ))}
        </div>
      ))}

      <button onClick={handleSubmit}>Submit Selection</button>
    </div>
  )
}

export default MuscleSelector*/
