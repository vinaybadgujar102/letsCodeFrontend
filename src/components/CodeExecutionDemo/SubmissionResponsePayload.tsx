import { motion } from "framer-motion";

export default function SubmissionResponsePayload() {
  return (
    <motion.div
      className="bg-purple-400 rounded-md p-2 absolute"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-xs font-mono text-white">
        {`{
  status: "queued",
  submissionId: "sub_${Date.now()}",
  message: "Submission accepted"
}`}
      </div>
    </motion.div>
  );
}
