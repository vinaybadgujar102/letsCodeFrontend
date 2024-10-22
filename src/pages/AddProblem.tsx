import { useState } from "react";
import Markdown from "react-markdown";
import { toast } from "react-toastify";
import rehypeRaw from "rehype-raw";

import { createProblem } from "../apis/problem.api";
import CodeStubEditor from "../components/CodeStubEditor";
import TestCases from "../components/TestCases";

interface TestCase {
  input: string;
  output: string;
}

export default function AddProblem() {
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const [codeStubs, setCodeStubs] = useState([]);
  const [testCases, setTestCases] = useState<TestCase[]>([]);

  async function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await createProblem(
        title,
        markdown,
        codeStubs,
        testCases
      );
      console.log(response);
      setTitle("");
      setMarkdown("");
      setCodeStubs([]);
      setTestCases([]);
      toast.info("Successfully created the problem!");
    } catch (error) {
      console.log("Something went wrong");
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="App bg-gray-100 min-h-screen flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Create a new problem
      </h1>
      <div className="w-full max-w-4xl p-5 bg-white rounded shadow-lg">
        <form className="grid grid-cols-1 gap-6" onSubmit={onFormSubmit}>
          <label className="block">
            <span className="text-gray-700">Problem Title: </span>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
              name="title"
              value={title}
            />
          </label>

          <label>
            <span className="text-gray-700">Problem Description: </span>
            <textarea
              name="description"
              rows={30}
              onChange={(e) => setMarkdown(e.target.value)}
              value={markdown}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
            ></textarea>
          </label>

          <div className="mt-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Description Preview
            </h2>
            <div className="mt-2 p-4 bg-white border border-gray-300 rounded-md shadow-sm">
              <Markdown
                rehypePlugins={[rehypeRaw]}
                className="prose prose-slate max-w-none prose-headings:text-gray-800 prose-strong:text-gray-800"
              >
                {markdown}
              </Markdown>
            </div>
          </div>

          <CodeStubEditor codeStubs={codeStubs} setCodeStubs={setCodeStubs} />
          <TestCases testCases={testCases} setTestCases={setTestCases} />

          <button className="btn btn-wide btn-info">Submit</button>
        </form>
      </div>
    </div>
  );
}
