import { motion } from "framer-motion";

export default function SubmissionServiceCard() {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 w-[300px]"
      whileHover={{ scale: 1.02 }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Submission Service
      </h3>
      <div className="bg-green-50 rounded-md p-4 mb-4">
        <pre className="text-sm text-gray-600 font-mono">
          {`{
  status: "processing",
  problemId: "123",
  code: "...",
  language: "js"
}`}
        </pre>
      </div>
      <div className="text-sm text-gray-500 mt-2">
        Processes code submissions
      </div>
    </motion.div>
  );
}
