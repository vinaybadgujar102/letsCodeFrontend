import { motion } from "framer-motion";
import DockerContainerAnimation from "./DockerContainerAnimation";

interface EvaluatorServiceCardProps {
  isEvaluating: boolean;
}

export default function EvaluatorServiceCard({
  isEvaluating,
}: EvaluatorServiceCardProps) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 w-[300px]"
      whileHover={{ scale: 1.02 }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Evaluator Service
      </h3>
      <div className="bg-purple-50 rounded-md p-4 mb-4">
        <pre className="text-sm text-gray-600 font-mono">
          {`{
  containers: {
    "js": "node:16",
    "python": "python:3.9",
    "java": "openjdk:11"
  },
  currentEvaluation: {
    status: "${isEvaluating ? "running" : "idle"}",
    container: "node:16"
  }
}`}
        </pre>
      </div>
      <DockerContainerAnimation language="js" isRunning={isEvaluating} />
      <div className="text-sm text-gray-500 mt-2">
        Evaluates code in secure containers
      </div>
    </motion.div>
  );
}
