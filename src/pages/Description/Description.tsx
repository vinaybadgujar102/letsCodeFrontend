/* eslint-disable simple-import-sort/imports  */
import { DragEvent, useEffect } from "react";
import { useState } from "react";
import DOMPurify from "dompurify";

// First import ace core
import "ace-builds/src-noconflict/ace";

// Then import mode-xxx files
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";

// Then import themes
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-terminal";

// Finally import extensions
import "ace-builds/src-noconflict/ext-language_tools";

import axios from "axios";
import { socket } from "../../socket"; // Ensure you have the correct path to your socket instance
import ProblemStatement from "../../components/ProblemStatement";
import CodeEditor from "../../components/CodeEditor";
import Console from "../../components/Console";
import { useAuth } from "../../context/AuthContext";
import {
  checkAndUpdateSubmissionCount,
  SUBMISSION_LIMIT,
} from "../../services/firebase";
import { toast } from "react-toastify";
import SubmissionLimit from "../../components/SubmissionLimit";

interface TestCase {
  input: string;
  output: string;
}

interface DescriptionProps {
  descriptionText: string;
  testCases: TestCase[];
}

function Description({ descriptionText, testCases }: DescriptionProps) {
  const sanitizedMarkdown = DOMPurify.sanitize(descriptionText);
  const [activeTab, setActiveTab] = useState("statement");
  const [testCaseTab, setTestCaseTab] = useState("testCase");
  const [leftWidth, setLeftWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("monokai");
  const [code, setCode] = useState("");
  const [responseData, setResponseData] = useState<{
    output: string;
    status: string;
  } | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const handleSubmissionResponse = (data: {
      response: {
        output: string;
        status: string;
      };
    }) => {
      setResponseData(data.response);
    };

    socket.on("submissionPayloadResponse", handleSubmissionResponse);

    return () => {
      socket.off("submissionPayloadResponse", handleSubmissionResponse);
    };
  }, []);

  console.log(responseData);

  async function handleSubmission() {
    try {
      if (!user) return;

      const canSubmit = await checkAndUpdateSubmissionCount(user.uid);

      if (!canSubmit) {
        toast.error(
          `You've reached your daily limit of ${SUBMISSION_LIMIT} submissions`
        );
        return;
      }

      console.log(code);
      console.log(language);
      const response = await axios.post(
        "http://13.200.216.194:3000/api/v1/submissions",
        {
          code,
          language,
          userID: user.uid,
          problemID: "671667d4cff1fd44f2b4e512",
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong with your submission");
    }
  }

  const startDragging = (e: DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const stopDragging = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  const onDrag = (e: DragEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const newLeftWidth = (e.clientX / window.innerWidth) * 100;
    if (newLeftWidth > 10 && newLeftWidth < 90) {
      setLeftWidth(newLeftWidth);
    }
  };

  return (
    <div>
      <SubmissionLimit />
      <div
        className="flex w-screen h-screen"
        onMouseMove={onDrag}
        onMouseUp={stopDragging}
      >
        <div
          className="leftPanel h-full overflow-auto"
          style={{ width: `${leftWidth}%` }}
        >
          <ProblemStatement
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            sanitizedMarkdown={sanitizedMarkdown}
          />
        </div>

        <div
          className="divider cursor-col-resize w-[5px] bg-slate-200 h-full"
          onMouseDown={startDragging}
        ></div>

        <div
          className="rightPanel h-full overflow-auto flex flex-col"
          style={{ width: `${100 - leftWidth}%` }}
        >
          <CodeEditor
            language={language}
            setLanguage={setLanguage}
            theme={theme}
            setTheme={setTheme}
            code={code}
            setCode={setCode}
            handleSubmission={handleSubmission}
          />
          <Console
            testCaseTab={testCaseTab}
            setTestCaseTab={setTestCaseTab}
            currentTestCase={testCases[0]}
            responseData={responseData}
          />
        </div>
      </div>
    </div>
  );
}

export default Description;
