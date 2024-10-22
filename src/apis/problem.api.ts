import axios from "../config/axios.config";

export async function createProblem(
  problemTitle: string,
  problemDescription: string,
  codeStubs: { language: string; startSnippet: string; endSnippet: string }[],
  testCases: { input: string; output: string }[]
) {
  try {
    const response = await axios.post("/api/v1/problems", {
      title: problemTitle,
      description: problemDescription,
      codeStubs: codeStubs,
      testCases: testCases,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getProblem(problemId: string) {
  const response = await axios.get(`/api/v1/problems/${problemId}`);
  return response;
}
