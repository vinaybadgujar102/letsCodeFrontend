import axios from "axios";

export async function createProblem(
  problemTitle: string,
  problemDescription: string,
  codeStubs: { language: string; startSnippet: string; endSnippet: string }[],
  testCases: { input: string; output: string }[],
  difficulty: string,
  userSnippet: string
) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_PROBLEM_ADMIN_BASE_URL}/api/v1/problems`,
      {
        title: problemTitle,
        description: problemDescription,
        codeStubs: codeStubs,
        testCases: testCases,
        difficulty: difficulty,
        userSnippet: userSnippet,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getProblem(problemId: string) {
  const response = await axios.get(
    `${
      import.meta.env.VITE_PROBLEM_ADMIN_BASE_URL
    }/api/v1/problems/${problemId}`
  );
  return response;
}

export async function getUserSubmissions(userId: string, problemId: string) {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_SUBMISSION_SERVICE_URL
      }/api/v1/submissions/user/${userId}/problem/${problemId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user submissions:", error);
    throw error;
  }
}
