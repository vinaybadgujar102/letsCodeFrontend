import { motion } from "framer-motion";

interface StepDescriptionProps {
  step: number;
}

export default function StepDescription({ step }: StepDescriptionProps) {
  const descriptions: Record<number, string> = {
    1: "Client sending code submission to Submission Service",
    2: "Submission Service validating with Problem Service",
    3: "Problem Service fetching problem details from MongoDB",
    4: "MongoDB returning problem data to Problem Service",
    5: "Problem Service sending validation result to Submission Service",
    6: "Submission Service queueing the validated submission",
    7: "Submission Service confirming submission to Client",
    8: "Evaluator picking up submission for processing",
    9: "Evaluator pushing evaluation results to queue",
  };

  return (
    <motion.div
      className="z-50 absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-md shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <p className="text-sm text-gray-600">{descriptions[step]}</p>
    </motion.div>
  );
}
