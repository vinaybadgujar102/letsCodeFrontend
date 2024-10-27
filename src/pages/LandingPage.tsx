import { Link } from "react-router-dom";

import React from "react";
import CodeExecutionDemo from "../components/CodeExecutionDemo/CodeExecutionDemo";

export function GridBackgroundDemo() {
  return (
    <div className="h-[50rem] w-full bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative z-20 text-center">
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-800 to-gray-500">
          LetsCode
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-lg mx-auto">
          Master your coding skills with our curated collection of programming
          challenges. Practice, learn, and grow.
        </p>
        <div className="mt-8">
          <Link
            to="/login"
            className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <GridBackgroundDemo />
      <CodeExecutionDemo />
    </div>
  );
}
