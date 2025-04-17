export const fetchExercises = async (target: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/exercises/${target}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch exercises for ${target}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching exercises:", err);
    return [];
  }
};

// You can add other API calls here (e.g., save exercises, etc.)
