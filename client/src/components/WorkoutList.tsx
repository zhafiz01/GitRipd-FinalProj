// components/WorkoutList.tsx
import { FC } from "react";
import WorkoutCard from "./WorkoutCard";

interface Exercise {
  id: number;
  name: string;
  target: string;
  equipment: string;
  gifUrl: string;
  videos: { title: string; link: string }[];
}

interface Props {
    exercises: Exercise[]
    addToCart: (exercise: Exercise) => void
}

const WorkoutList: FC<Props> = ({ exercises, addToCart }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {exercises.map((exercise) => (
        <WorkoutCard key={exercise.id} exercise={exercise} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default WorkoutList;
