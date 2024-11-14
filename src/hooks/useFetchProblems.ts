import axios from "axios";
import { useEffect, useState } from "react";

interface Problem {
  _id: string;
  title: string;
  difficulty: string;
}

const useFetchProblems = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PROBLEM_ADMIN_BASE_URL}/api/v1/problems`
        );
        setProblems(response.data.data);
      } catch (error) {
        console.error("Error fetching problems:", error);
        setError("Failed to fetch problems");
      }
    };

    fetchProblems();
  }, []);

  return { problems, error };
};

export default useFetchProblems;
