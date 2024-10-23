import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../config/axios.config";

interface Problem {
  _id: string;
  title: string;
  difficulty: string;
}

const ProblemList: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);

  console.log(problems);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get("/api/v1/problems");
        setProblems(response.data.data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "hard":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          LeetCode Clone Problems
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem) => (
            <Link
              key={problem._id}
              to={`/problem/${problem._id}`}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {problem.title}
                </h2>
                <p
                  className={`text-sm font-medium ${getDifficultyColor(
                    problem.diffiulty
                  )}`}
                >
                  {problem.difficulty}
                </p>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <span className="text-sm text-gray-600">Solve Challenge →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemList;
