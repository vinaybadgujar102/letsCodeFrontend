import { motion } from "framer-motion";

export default function Payload() {
  return (
    <motion.div
      className="bg-yellow-400 rounded-md p-2 absolute"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-xs font-mono text-black">
        {`{
  code: "function sum...",
  lang: "javascript"
}`}
      </div>
    </motion.div>
  );
}
