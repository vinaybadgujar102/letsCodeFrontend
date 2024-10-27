import { motion } from "framer-motion";

interface DockerContainerAnimationProps {
  language: string;
  isRunning: boolean;
}

export default function DockerContainerAnimation({
  language,
  isRunning,
}: DockerContainerAnimationProps) {
  const containerImage = {
    js: "node:16",
    python: "python:3.9",
    java: "openjdk:11",
  }[language];

  return (
    <motion.div
      className="bg-blue-900 rounded-md p-3 mt-2"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isRunning ? 1 : 0,
        scale: isRunning ? 1 : 0.8,
        y: isRunning ? 0 : 20,
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-2 mb-2">
        <motion.div
          className="w-2 h-2 rounded-full bg-green-400"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        />
        <span className="text-xs text-gray-300 font-mono">
          {containerImage}
        </span>
      </div>
      <motion.div
        className="text-xs text-green-400 font-mono"
        animate={{ opacity: [1, 0.5] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        {`> Executing tests...
> Test 1: ✓
> Test 2: ✓
> Test 3: ✓`}
      </motion.div>
    </motion.div>
  );
}
