import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClientCard from "./ClientCard";
import ProblemServiceCard from "./ProblemServiceCard";
import SubmissionServiceCard from "./SubmissionServiceCard";
import MongoDBCard from "./MongoDBCard";
import SubmissionQueueCard from "./SubmissionQueueCard";
import Payload from "./Payload";
import ResponsePayload from "./ResponsePayload";
import SubmissionResponsePayload from "./SubmissionResponsePayload";
import EvaluatorServiceCard from "./EvaluatorServiceCard";
import EvaluationQueueCard from "./EvaluationQueueCard";
import SpeedControl from "./SpeedControl";
import StepDescription from "./StepDescription";

export default function CodeExecutionDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [queuedPayloads, setQueuedPayloads] = useState<number[]>([]);
  const [evaluationResults, setEvaluationResults] = useState<
    Array<{
      id: number;
      status: "passed" | "failed";
      testsPassed?: number;
    }>
  >([]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [speed, setSpeed] = useState(1);

  const handleSubmit = () => {
    if (isAnimating) return; // Prevent multiple submissions
    setIsAnimating(true);
    animateFlow();
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms / speed));

  const animateFlow = async () => {
    // Step 1: Client to Submission Service
    setCurrentStep(1);
    await delay(2000);

    // Step 2: Submission Service to Problem Service
    setCurrentStep(2);
    await delay(2000);

    // Step 3: Problem Service to MongoDB
    setCurrentStep(3);
    await delay(2000);

    // Step 4: MongoDB to Problem Service
    setCurrentStep(4);
    await delay(2000);

    // Step 5: Problem Service to Submission Service
    setCurrentStep(5);
    await delay(2000);

    // Step 6: Add to submission queue
    setCurrentStep(6);
    const submissionId = Date.now();
    setQueuedPayloads([submissionId]); 
    await delay(2000);

    // Step 7: Submission Service response to Client
    setCurrentStep(7);
    await delay(2000);

    // Step 8: Evaluator picks from Queue
    setIsEvaluating(true);
    setCurrentStep(8);
    await delay(2000);

    // Step 9: Evaluator pushes results
    setCurrentStep(9);
    await delay(2000);

    const result = {
      id: Date.now(),
      status: Math.random() > 0.5 ? "passed" : "failed",
      testsPassed: Math.floor(Math.random() * 5),
    };
    setEvaluationResults((prev) => [...prev, result]);
    setIsEvaluating(false);

    setCurrentStep(0);
    setQueuedPayloads([]); 
    setIsAnimating(false);
  };

  const totalSubmissions = queuedPayloads.length;

  return (
    <div className="relative w-full h-[800px] flex items-center justify-center bg-gray-50">
      <SpeedControl speed={speed} onChange={setSpeed} />
      <AnimatePresence>
        {currentStep > 0 && <StepDescription step={currentStep} />}
      </AnimatePresence>

      <div className="absolute grid grid-cols-3 gap-x-40 gap-y-32">
        <div className="col-span-1">
          <ClientCard
            onSubmit={handleSubmit}
            totalSubmissions={totalSubmissions}
          />
        </div>
        <div className="col-span-1">
          <SubmissionServiceCard />
        </div>
        <div className="col-span-1">
          <ProblemServiceCard />
        </div>
        <div className="col-span-1" />
        <div className="col-span-1">
          <SubmissionQueueCard payloads={queuedPayloads} />
        </div>
        <div className="col-span-1">
          <MongoDBCard />
        </div>
        <div className="col-span-1" /> 
        <div className="col-span-1">
          <EvaluatorServiceCard isEvaluating={isEvaluating} />
        </div>
        <div className="col-span-1">
          <EvaluationQueueCard results={evaluationResults} />
        </div>
      </div>

      <AnimatePresence>
        {isAnimating && currentStep === 1 && (
          <motion.div
            initial={{ x: -400, y: 0 }}
            animate={{ x: 0, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ position: "absolute" }}
          >
            <Payload />
          </motion.div>
        )}

        {isAnimating && currentStep === 2 && (
          <motion.div
            initial={{ x: 0, y: 0 }}
            animate={{ x: 400, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ position: "absolute" }}
          >
            <Payload />
          </motion.div>
        )}

        {isAnimating && currentStep === 3 && (
          <motion.div
            initial={{ x: 400, y: 0 }}
            animate={{ x: 400, y: 200 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ position: "absolute" }}
            className="bg-blue-400 rounded-md p-2"
          >
            <div className="text-xs font-mono text-white">
              {`db.problems.findOne({ _id: "123" })`}
            </div>
          </motion.div>
        )}

        {isAnimating && currentStep === 4 && (
          <motion.div
            initial={{ x: 400, y: 200 }}
            animate={{ x: 400, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ position: "absolute" }}
          >
            <ResponsePayload />
          </motion.div>
        )}

        {isAnimating && currentStep === 5 && (
          <motion.div
            initial={{ x: 400, y: 0 }}
            animate={{ x: 0, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ position: "absolute" }}
          >
            <ResponsePayload />
          </motion.div>
        )}

        {isAnimating && currentStep === 6 && (
          <motion.div
            initial={{ x: 0, y: 0 }}
            animate={{ x: 0, y: 200 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              y: { type: "spring", stiffness: 100 },
            }}
            style={{ position: "absolute" }}
          >
            <motion.div
              className="bg-red-400 rounded-md p-2"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <div className="text-xs font-mono text-white">
                {`{
  id: "sub_${Date.now()}",
  code: "...",
  status: "queued"
}`}
              </div>
            </motion.div>
          </motion.div>
        )}

        {isAnimating && currentStep === 7 && (
          <motion.div
            initial={{ x: 0, y: 0 }}
            animate={{ x: -400, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ position: "absolute" }}
          >
            <SubmissionResponsePayload />
          </motion.div>
        )}

        {isAnimating && currentStep === 8 && (
          <motion.div
            initial={{ x: 0, y: 200 }}
            animate={{ x: 0, y: 400 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ position: "absolute" }}
          >
            <motion.div className="bg-purple-400 rounded-md p-2">
              <div className="text-xs font-mono text-white">
                {`{
  id: "sub_${Date.now()}",
  status: "evaluating"
}`}
              </div>
            </motion.div>
          </motion.div>
        )}

        {isAnimating && currentStep === 9 && (
          <motion.div
            initial={{ x: 0, y: 400 }}
            animate={{ x: 400, y: 400 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ position: "absolute" }}
            onAnimationComplete={() => {
              const result = {
                id: Date.now(),
                status: Math.random() > 0.5 ? "passed" : "failed",
                testsPassed: Math.floor(Math.random() * 5),
              };
              setEvaluationResults((prev) => [...prev, result]);
              setQueuedPayloads((prev) => prev.slice(1));
          >
            <motion.div className="bg-indigo-400 rounded-md p-2">
              <div className="text-xs font-mono text-white">
                {`{
  status: "completed",
  result: "passed",
  testsPassed: 5/5
}`}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
