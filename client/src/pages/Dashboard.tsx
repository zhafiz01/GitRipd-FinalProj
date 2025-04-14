import { FC, useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";

interface Exercise {
  id: number;
  name: string;
  target: string;
  equipment: string;
  gifUrl: string;
  videos: { title: string; link: string }[];
}

const Dashboard: FC = () => {
  const [workoutPlan, setWorkoutPlan] = useState<Exercise[]>([]);
  //const [userName, setUserName] = useState<string>("User Name"); // Placeholder for user name
  //const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/plans");
        if (!response.ok) {
          throw new Error("Error fetching workout plan");
        }
        const data = await response.json();
        setWorkoutPlan(data.exercises);
      } catch (err) {
        console.error("Error fetching workout plan:", err);
        alert("❌ Could not fetch workout plan");
      }
    };

    fetchWorkoutPlan();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5050/api/plans/exercise/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete exercise from plan");
      }

      const updatedPlan = await response.json();
      setWorkoutPlan(updatedPlan.exercises);
    } catch (err) {
      console.error("Error deleting exercise:", err);
      alert("❌ Could not delete exercise from plan");
    }
  };

  return (
    <div style={{ padding: "1rem", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <h1>User - You're Crushing it!</h1>
      <br />
      <h2>Progress Tracker:</h2>
      <br />
      {/* Placeholder for progress tracker */}
      <div>(Insert progress tracker diagram here)</div>
      <br />
      <h3>Tips for success:</h3>
      <ul>
        <li>Stay consistent with your workouts.</li>
        <li>Focus on form over weight to avoid injury.</li>
        <li>Eat a balanced diet to fuel your gains.</li>
      </ul>
      <br />
      <h3>Today's Focus:</h3>
      <ul>
        <li>Strength Training: Focus on upper body today.</li>
        <li>Cardio: Aim for at least 20 minutes of cardio.</li>
        <li>Stretching: Don’t forget to cool down with stretches.</li>
      </ul>
      <br />
      <h2>Your Workout Plan</h2>
      {workoutPlan.length > 0 ? (
        <ul>
          {workoutPlan.map((exercise) => (
            <li key={exercise.id}>
              {exercise.name}{" "}
              <button
                onClick={() => handleDelete(exercise.id)}
                style={{
                  marginLeft: "1rem",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "0.3rem 0.5rem",
                }}
              >
                ❌ Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No workout plan available.</p>
      )}
    </div>
  );
};

export default Dashboard;
