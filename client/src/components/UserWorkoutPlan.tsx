import React from "react";

interface Exercise {
  id: number;
  name: string;
  target: string;
  equipment: string;
  gifUrl: string;
  videos: { title: string; link: string }[];
}

interface Props {
  exercises: Exercise[];
  handleDelete: (id: number) => void;
  handleSave: () => void;
}

const UserWorkoutPlan: React.FC<Props> = ({ exercises, handleDelete, handleSave }) => {
  if (exercises.length === 0) return null;

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Your Workout Plan</h2>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            {exercise.name}{" "}
            <button onClick={() => handleDelete(exercise.id)} style={{ marginLeft: "1rem" }}>
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
  );
};

export default UserWorkoutPlan;
