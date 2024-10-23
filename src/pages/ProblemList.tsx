import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import useFetchProblems from "../hooks/useFetchProblems";

const ProblemList: React.FC = () => {
  const { problems, error } = useFetchProblems();

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

  console.log(getDifficultyColor("easy"));
  console.log(problems[0]);

  return (
    <div className="flex flex-col w-screen h-screen">
      <Navbar />
      <div className="leftPanel h-full overflow-auto w-full">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray mb-8">
            Problems to Solve
          </h1>
          {error && <p className="text-red-500">{error}</p>}
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
                      problem.difficulty
                    )}`}
                  >
                    {problem.difficulty}
                  </p>
                </div>
                <div className="bg-gray-50 px-6 py-4">
                  <span className="text-sm text-gray-600">
                    Solve Challenge →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemList;
