import {
  doc,
  getDoc,
  getFirestore,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { auth } from "../config/firebase";

const db = getFirestore();

export const SUBMISSION_LIMIT = 50;

export async function checkAndUpdateSubmissionCount(
  userId: string
): Promise<boolean> {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    // First time user, create document with submission count
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

  // Increment submission count
  await updateDoc(userRef, {
    submissionCount: increment(1),
  });

  return true;
}
