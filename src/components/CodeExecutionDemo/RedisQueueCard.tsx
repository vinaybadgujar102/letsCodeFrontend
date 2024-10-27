import { motion } from "framer-motion";

interface RedisQueueCardProps {
  payloads: number[];
}

export default function RedisQueueCard({ payloads }: RedisQueueCardProps) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 w-[300px]"
      whileHover={{ scale: 1.02 }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Redis Queue</h3>
      <div className="bg-red-50 rounded-md p-4 mb-4 max-h-40 overflow-auto">
        {payloads.map((id, index) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-gray-600 font-mono mb-2"
          >
            {`{ id: "sub_${id}", status: "queued" }`}
          </motion.div>
        ))}
        {payloads.length === 0 && (
          <div className="text-sm text-gray-400 italic">Queue is empty</div>
        )}
      </div>
      <div className="text-sm text-gray-500 mt-2">
        Waiting for worker pickup...
      </div>
    </motion.div>
  );
}
