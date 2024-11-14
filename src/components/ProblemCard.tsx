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
    <Link to={`/problem/${problem._id}`}>
      <div className="card bg-white shadow-xl hover:shadow-2xl transition-shadow duration-200">
        <div className="card-body">
          <h2 className="card-title text-gray-800">{problem.title}</h2>
          <p
            className={`${getDifficultyColor(problem.difficulty)} font-medium`}
          >
            {problem.difficulty}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProblemCard;
