import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ProblemCard from "../components/ProblemCard";
import useFetchProblems from "../hooks/useFetchProblems";

const ProblemList: React.FC = () => {
  const { problems, error } = useFetchProblems();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");

  const filteredProblems =
    selectedDifficulty === "all"
      ? problems
      : problems.filter(
          (problem) => problem.difficulty.toLowerCase() === selectedDifficulty
        );

  return (
    <div className="flex flex-col w-screen h-screen">
      <Navbar page="problems" />
      <div className="leftPanel h-full overflow-auto w-full">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray mb-8">
            Problems to Solve
          </h1>

          {/* Difficulty Filter */}
          <div className="mb-6">
            <label className="mr-4 font-medium">Filter by Difficulty:</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="select select-bordered w-fill max-w-xs"
            >
              <option value="all">All</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProblems.map((problem) => (
              <ProblemCard key={problem._id} problem={problem} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemList;
