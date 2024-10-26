import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FiInfo } from "react-icons/fi";
import { Tooltip } from "react-tooltip";

import { useAuth } from "../context/AuthContext";
import { SUBMISSION_LIMIT } from "../services/firebase";

export default function SubmissionLimit() {
  const { user } = useAuth();
  const [submissionCount, setSubmissionCount] = useState(0);
  const db = getFirestore();

  useEffect(() => {
    async function fetchSubmissionCount() {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        setSubmissionCount(userDoc.data().submissionCount || 0);
      }
    }

    fetchSubmissionCount();
  }, [user, db]);

  const remainingSubmissions = Math.max(0, SUBMISSION_LIMIT - submissionCount);
  const percentage =
    ((SUBMISSION_LIMIT - remainingSubmissions) / SUBMISSION_LIMIT) * 100;

  return (
    <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg shadow-md relative z-50">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-gray-300 font-medium">Daily Submissions</span>
          <FiInfo
            className="text-gray-400 cursor-help"
            data-tooltip-id="submission-limit-tooltip"
          />
          <Tooltip
            id="submission-limit-tooltip"
            className="max-w-xs bg-gray-700 text-sm z-[60]"
          >
            To ensure fair usage and system stability, we limit the number of
            submissions per user. The limit resets daily at midnight UTC.
          </Tooltip>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              percentage < 50
                ? "bg-green-500"
                : percentage < 80
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      <div className="text-right">
        <span className="text-gray-300 font-mono">
          {remainingSubmissions}/{SUBMISSION_LIMIT}
        </span>
      </div>
    </div>
  );
}
