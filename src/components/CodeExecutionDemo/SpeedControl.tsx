import { motion } from "framer-motion";

interface SpeedControlProps {
  speed: number;
  onChange: (speed: number) => void;
}

export default function SpeedControl({ speed, onChange }: SpeedControlProps) {
  return (
    <div className="absolute top-4 right-4 flex items-center space-x-2">
      <span className="text-sm text-gray-600">Slow</span>
      <input
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={speed}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-32"
      />
      <span className="text-sm text-gray-600">Fast</span>
    </div>
  );
}
