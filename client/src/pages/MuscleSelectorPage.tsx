// pages/MuscleSelectorPage.tsx
import { useState } from "react";
import MuscleSelector from "../components/MuscleSelector";
import WorkoutPlanList from "../components/WorkoutPlanList";
import { useNavigate } from "react-router-dom";
import Exercise from "../interfaces/Exercise";

const MuscleSelectorPage = () => {
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [cart, setCart] = useState<Exercise[]>([]);

  const navigate = useNavigate()

	const handleSubmit = async (muscles: string[]) => {
		setSelectedMuscles(muscles)
		setExercises([])

		if (muscles.length === 0) return

		try {
			const allExercises: Exercise[] = []

			for (const muscle of muscles) {
				const response = await fetch(
					`http://localhost:5050/api/exercises/${muscle}`
				)
				const data = await response.json()
				allExercises.push(...data)
			}

			setExercises(allExercises)
			console.log("Fetched exercises:", allExercises)
		} catch (error) {
			console.error("Error fetching exercises:", error)
		}
	}

	const addToCart = (exercise: Exercise) => {
		setCart((prevCart) => [...prevCart, exercise])
	}

  const handleDelete = (id: number) => {
    setCart((prevCart) => prevCart.filter((exercise) => exercise.id !== id));
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ exercises: cart }), 
      });

      if (!response.ok) throw new Error("Failed to save workout plan");

      const saved = await response.json();
      console.log("Saved Plan:", saved);
      alert("✅ Workout plan saved!");

      navigate("/dashboard");
    } catch (err) {
      console.error("Save error:", err);
      alert("❌ Could not save workout plan.");
    }
  };

  return (
    <div
      style={{
        padding: "1rem",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f0f2f5",
        color: "#222",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#111" }}>Workout Planner</h1>
      <MuscleSelector onSubmit={handleSubmit} />
      <p style={{ marginTop: "1rem", fontWeight: "bold" }}>
        Selected: {selectedMuscles.join(", ")}
      </p>
      {cart.length > 0 && (
        <div>
          <h2 style={{ marginTop: "2rem" }}>Your Workout Plan</h2>
          <ul>
            {cart.map((exercise) => (
              <li key={exercise.id}>{exercise.name} 
                <button onClick={() => handleDelete(exercise.id)}
                style={{
                  backgroundColor: "#f44336",
                  color: "#fff",
                  padding: "0.5rem",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginLeft: "1rem",
                }}>Delete</button>
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
            Save to Workout Plan
          </button>
        </div>
      )}
      {exercises.length > 0 && (
        <div>
          <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>
            Exercise Results
          </h2>
          <WorkoutPlanList exercises={exercises} addToCart={addToCart} />
        </div>
      )}
    </div>
  );
};

export default MuscleSelectorPage

/*import { useState } from "react"
import MuscleSelector from "../components/MuscleSelector"

interface Exercise {
  id: number
  name: string
  target: string
  equipment: string
  gifUrl: string
  videos: { title: string; link: string }[]
  sets?: string
  reps?: string
  notes?: string
}

const MuscleSelectorPage = () => {
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([])
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [workoutPlan, setWorkoutPlan] = useState<Exercise[]>([])

  const handleSubmit = async (muscles: string[]) => {
    setSelectedMuscles(muscles)
    setExercises([])
    setWorkoutPlan([])

    if (muscles.length === 0) return
    const allExercises: Exercise[] = []
    for (const muscle of muscles) {
      try {
        const response = await fetch(`http://localhost:5050/api/exercises/${muscle}`)
        if (!response.ok) {
          const errText = await response.text()
          throw new Error(errText)
        }

        const data: Exercise[] = await response.json()
        const filtered = data.filter(ex => !ex.name.toLowerCase().startsWith("assisted"))
        allExercises.push(...filtered.slice(0, 3)) // Limit to 3 per muscle
      } catch (error) {
        console.error("Error fetching exercises:", error)
      }
    }
    setExercises(allExercises)
  }

  const addToPlan = (exercise: Exercise) => {
    if (!workoutPlan.find((ex) => ex.id === exercise.id)) {
      setWorkoutPlan((prev) => [
        ...prev,
        { ...exercise, sets: "", reps: "", notes: "" },
      ])
    }
  }

  const updatePlanField = (id: number, field: keyof Exercise, value: string) => {
    setWorkoutPlan((prev) =>
      prev.map((ex) =>
        ex.id === id ? { ...ex, [field]: value } : ex
      )
    )
  }

  const savePlanToBackend = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ exercises: workoutPlan }),
      })

      if (!response.ok) throw new Error("Failed to save plan")

      const data = await response.json()
      alert("✅ Workout plan saved successfully!")
      console.log("Saved plan:", data)
    } catch (error) {
      console.error("Error saving workout plan:", error)
      alert("❌ Failed to save workout plan. Please try again.")
    }
  }

  return (
    <div
      style={{
        padding: "1rem",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f0f2f5",
        color: "#222",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#111" }}>Workout Planner</h1>
      <MuscleSelector onSubmit={handleSubmit} />
      <p style={{ marginTop: "1rem", fontWeight: "bold" }}>
        Selected: {selectedMuscles.join(", ")}
      </p>

      {exercises.length > 0 && (
        <div>
          <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>
            Exercise Results
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {exercises.map((ex) => (
              <div
                key={ex.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "1rem",
                  width: "300px",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  color: "#333",
                }}
              >
                <h3>{ex.name}</h3>
                <img
                  src={ex.gifUrl.trim()}
                  alt={ex.name}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "4px",
                    marginBottom: "0.5rem",
                  }}
                />
                <p>
                  <strong>Target:</strong> {ex.target}
                </p>
                <p>
                  <strong>Equipment:</strong> {ex.equipment}
                </p>
                {ex.videos.length > 0 && (
                  <div>
                    <strong>Videos:</strong>
                    <ul style={{ paddingLeft: "1rem" }}>
                      {ex.videos.slice(0, 2).map((vid, i) => (
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
                <button
                  onClick={() => addToPlan(ex)}
                  style={{
                    marginTop: "0.5rem",
                    backgroundColor: "#00bcd4",
                    color: "#fff",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Add to Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {workoutPlan.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Your Workout Plan</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {workoutPlan.map((ex) => (
              <li
                key={ex.id}
                style={{
                  marginBottom: "1rem",
                  padding: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                }}
              >
                <h3>{ex.name}</h3>
                <p>
                  <strong>Target:</strong> {ex.target} |{" "}
                  <strong>Equipment:</strong> {ex.equipment}
                </p>
                <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                  <label>
                    Sets:{" "}
                    <input
                      type="number"
                      value={ex.sets}
                      onChange={(e) => updatePlanField(ex.id, "sets", e.target.value)}
                      style={{ width: "50px" }}
                    />
                  </label>
                  <label>
                    Reps:{" "}
                    <input
                      type="number"
                      value={ex.reps}
                      onChange={(e) => updatePlanField(ex.id, "reps", e.target.value)}
                      style={{ width: "50px" }}
                    />
                  </label>
                </div>
                <label style={{ display: "block", marginTop: "0.5rem" }}>
                  Notes:
                  <input
                    type="text"
                    value={ex.notes}
                    onChange={(e) => updatePlanField(ex.id, "notes", e.target.value)}
                    style={{ width: "100%", marginTop: "0.25rem" }}
                  />
                </label>
              </li>
            ))}
          </ul>

          <button
            onClick={savePlanToBackend}
            style={{
              marginTop: "1rem",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Save Workout Plan
          </button>
        </div>
      )}
    </div>
  )
}

export default MuscleSelectorPage */
