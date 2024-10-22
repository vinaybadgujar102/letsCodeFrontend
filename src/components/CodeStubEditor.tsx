import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";

import React, { useState } from "react";
import AceEditor from "react-ace";

import Languages from "../constant/Languages";

interface CodeStub {
  language: string;
  startSnippet: string;
  endSnippet: string;
}

interface CodeStubEditorProps {
  codeStubs: CodeStub[];
  setCodeStubs: React.Dispatch<React.SetStateAction<CodeStub[]>>;
}

const CodeStubEditor: React.FC<CodeStubEditorProps> = ({
  codeStubs,
  setCodeStubs,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(Languages[0].value);
  const [currentStartSnippet, setCurrentStartSnippet] = useState("");
  const [currentEndSnippet, setCurrentEndSnippet] = useState("");

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
    const existingStub = codeStubs.find(
      (stub) => stub.language === e.target.value
    );
    setCurrentStartSnippet(existingStub ? existingStub.startSnippet : "");
    setCurrentEndSnippet(existingStub ? existingStub.endSnippet : "");
  };

  const handleStartSnippetChange = (newCode: string) => {
    setCurrentStartSnippet(newCode);
  };

  const handleEndSnippetChange = (newCode: string) => {
    setCurrentEndSnippet(newCode);
  };

  const addOrUpdateCodeStub = () => {
    const updatedStubs = codeStubs.filter(
      (stub) => stub.language !== selectedLanguage
    );
    updatedStubs.push({
      language: selectedLanguage,
      startSnippet: currentStartSnippet,
      endSnippet: currentEndSnippet,
    });
    setCodeStubs(updatedStubs);
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Code Stubs</h2>
      <div className="flex items-center mb-4">
        <select
          className="select select-bordered w-full max-w-xs mr-4"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          {Languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.languageName}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={addOrUpdateCodeStub}>
          Add/Update Stub
        </button>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Start Snippet</h3>
        <AceEditor
          mode={selectedLanguage}
          theme="monokai"
          onChange={handleStartSnippetChange}
          name="start-snippet-editor"
          editorProps={{ $blockScrolling: true }}
          value={currentStartSnippet}
          width="100%"
          height="150px"
        />
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">End Snippet</h3>
        <AceEditor
          mode={selectedLanguage}
          theme="monokai"
          onChange={handleEndSnippetChange}
          name="end-snippet-editor"
          editorProps={{ $blockScrolling: true }}
          value={currentEndSnippet}
          width="100%"
          height="150px"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Current Code Stubs:
        </h3>
        <ul className="list-disc pl-5">
          {codeStubs.map((stub) => (
            <li key={stub.language}>{stub.language}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CodeStubEditor;
