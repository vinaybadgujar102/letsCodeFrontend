// ProblemCard.tsx
import React from "react";
import { Link } from "react-router-dom";

interface Problem {
  _id: string;
  title: string;
  difficulty: string;
}

interface ProblemCardProps {
  problem: Problem;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => {
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
    <Link
      to={`/problem/${problem._id}`}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105 fixed-card-layout overflow-hidden"
    >
      <div className="p-4 h-28 flex flex-col justify-between">
        <h2 className="text-lg font-semibold text-gray-800">{problem.title}</h2>
        <p
          className={`text-sm font-medium ${getDifficultyColor(
            problem.difficulty
          )}`}
        >
          {problem.difficulty}
        </p>
      </div>
      <div className="bg-gray-50 px-4 py-3">
        <span className="text-sm text-gray-600">Solve Challenge →</span>
      </div>
    </Link>
  );
};

export default ProblemCard;
