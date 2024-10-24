import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Master Your Coding Skills
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Practice coding problems, track your progress, and improve your
            algorithmic thinking with our curated collection of programming
            challenges.
          </p>
          <div className="flex justify-center gap-6">
            <Link to="/login" className="btn btn-primary btn-lg">
              Get Started
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-primary text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Diverse Problem Set
            </h3>
            <p className="text-gray-400">
              From easy to hard, practice problems across different difficulty
              levels.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-primary text-4xl mb-4">💻</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Multiple Languages
            </h3>
            <p className="text-gray-400">
              Code in your preferred language with support for Python,
              JavaScript, Java, and C++.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-primary text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Real-time Testing
            </h3>
            <p className="text-gray-400">
              Get instant feedback on your solutions with our automated test
              cases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
