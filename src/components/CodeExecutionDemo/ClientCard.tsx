import { motion } from "framer-motion";
import { useState } from "react";

interface ClientCardProps {
  onSubmit: () => void;
  totalSubmissions: number;
}

export default function ClientCard({
  onSubmit,
  totalSubmissions,
}: ClientCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const sampleCode = `function sum(a, b) {
  return a + b;
}

console.log(sum(5, 3));`;

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 w-[300px]"
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Client</h3>
      <div className="bg-gray-900 rounded-md p-4 mb-4">
        <pre className="text-sm text-gray-300 font-mono">{sampleCode}</pre>
      </div>
      <motion.button
        className={`w-full py-2 px-4 rounded-md transition-colors ${
          isAnimating
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
        whileTap={!isAnimating ? { scale: 0.95 } : undefined}
        onClick={onSubmit}
        disabled={isAnimating}
      >
        {isAnimating ? "Processing..." : "Submit Code"}
      </motion.button>
      {isHovered && (
        <motion.div
          className="mt-2 text-xs text-gray-500 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Click submit to see the execution flow
        </motion.div>
      )}
    </motion.div>
  );
}
