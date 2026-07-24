import {
  doc,
  getDoc,
  getFirestore,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import app, { auth } from "../config/firebase";

const db = getFirestore(app);

export const SUBMISSION_LIMIT = 50;

export async function checkAndUpdateSubmissionCount(
  userId: string
): Promise<boolean> {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        submissionCount: 1,
        email: auth.currentUser?.email,
      });
      return true;
    }

    const submissionCount = userDoc.data().submissionCount || 0;

    if (submissionCount >= SUBMISSION_LIMIT) {
      return false;
    }

    await updateDoc(userRef, {
      submissionCount: increment(1),
    });

    return true;
  } catch (error) {
    // Don't block submissions if Firestore is misconfigured/unavailable
    console.warn("Submission limit check failed, allowing submit:", error);
    return true;
  }
}
