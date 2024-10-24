import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

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
  }, [user]);

  return (
    <div className="text-sm text-gray-600">
      Submissions remaining: {Math.max(0, SUBMISSION_LIMIT - submissionCount)}/
      {SUBMISSION_LIMIT}
    </div>
  );
}
