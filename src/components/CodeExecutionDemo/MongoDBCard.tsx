import { motion } from "framer-motion";

export default function MongoDBCard() {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 w-[300px]"
      whileHover={{ scale: 1.02 }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">MongoDB</h3>
      <div className="bg-green-50 rounded-md p-4 mb-4">
        <pre className="text-sm text-gray-600 font-mono">
          {`{
  "_id": "123",
  "title": "Sum",
  "description": "...",
  "testCases": [
    {
      "input": "2,3",
      "output": "5"
    }
  ]
}`}
        </pre>
      </div>
      <div className="text-sm text-gray-500 mt-2">Problem Database</div>
    </motion.div>
  );
}
