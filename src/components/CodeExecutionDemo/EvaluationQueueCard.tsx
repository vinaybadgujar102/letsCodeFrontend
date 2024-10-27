import { motion } from "framer-motion";

interface EvaluationQueueCardProps {
  results: Array<{
    id: number;
    status: "passed" | "failed";
    testsPassed?: number;
  }>;
}

export default function EvaluationQueueCard({
  results,
}: EvaluationQueueCardProps) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 w-[300px]"
      whileHover={{ scale: 1.02 }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Evaluation Results Queue
      </h3>
      <div className="bg-indigo-50 rounded-md p-4 mb-4 max-h-40 overflow-auto">
        {results.map((result) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-sm font-mono mb-2 ${
              result.status === "passed" ? "text-green-600" : "text-red-600"
            }`}
          >
            {`{
  id: "sub_${result.id}",
  status: "${result.status}",
  testsPassed: ${result.testsPassed ?? 0}
}`}
          </motion.div>
        ))}
        {results.length === 0 && (
          <div className="text-sm text-gray-400 italic">No results yet</div>
        )}
      </div>
      <div className="text-sm text-gray-500 mt-2">
        Stores evaluation results
      </div>
    </motion.div>
  );
}
