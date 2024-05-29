/* eslint-disable simple-import-sort/imports  */
import { useState } from "react";
import AceEditor from "react-ace";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/theme-github";

import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/ext-language_tools";

function Description({ descriptionText }: { descriptionText: string }) {
  const sanitizedMarkdown = descriptionText;

  const [activeTab, setActiveTab] = useState("statement");
  const [leftWidth, setLeftWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const startDragging = (e: MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const stopDragging = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  const onDrag = (e: MouseEvent) => {
    if (!isDragging) return;

    const newLeftWidth = (e.clientX / window.innerWidth) * 100;
    if (newLeftWidth > 10 && newLeftWidth < 90) {
      setLeftWidth(newLeftWidth);
    }
  };

  const isActiveTab = (tabName: string) => {
    if (activeTab === tabName) {
      return "tab tab-active";
    }
    return "tab";
  };

  return (
    <div
      className="flex w-screen h-screen"
      onMouseMove={onDrag}
      onMouseUp={stopDragging}
    >
      <div
        className="leftPanel h-full overflow-auto"
        style={{ width: `${leftWidth}%` }}
      >
        <div role="tablist" className="tabs tabs-boxed w-3/5">
          <a
            role="tab "
            className={isActiveTab("statement")}
            onClick={() => setActiveTab("statement")}
          >
            Problem Statement
          </a>
          <a
            role="tab"
            className={isActiveTab("editorial")}
            onClick={() => setActiveTab("editorial")}
          >
            Editorial
          </a>
          <a
            role="tab"
            className={isActiveTab("submissions")}
            onClick={() => setActiveTab("submissions")}
          >
            Submission
          </a>
        </div>

        <div className="markdownViewer p-[20px] basis-1/2">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {sanitizedMarkdown}
          </ReactMarkdown>
        </div>
      </div>

      <div
        className="divider cursor-col-resize w-[5px] bg-slate-200 h-full"
        onMouseDown={startDragging}
      ></div>

      <div
        className="rightPanel h-full overflow-auto"
        style={{ width: `${100 - leftWidth}%` }}
      >
        <div className="flex gap-x-2 justify-start items-center px-4 py-2">
          <div>
            <button className="btn btn-success btn-sm">Submit</button>
          </div>
          <div>
            <button className="btn btn-warning btn-sm">Run Code</button>
          </div>
          <div>
            <select className="select select-sm select-info w-full max-w-xs">
              <option disabled selected>
                Language
              </option>
              <option>CPP</option>
              <option>Java</option>
              <option value="">JS</option>
              <option value="">Python</option>
            </select>
          </div>
          <div>
            <select className="select select-sm select-info w-full max-w-xs">
              <option disabled selected>
                Theme
              </option>
              <option>Monokai</option>
              <option>Github</option>
              <option value="">Github Dark</option>
            </select>
          </div>
        </div>
        <div className="editorContainer">
          <AceEditor
            mode="javascript"
            theme="monokai"
            name="codeEditor"
            className="editor"
            style={{ width: "100%" }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              showLineNumbers: true,
              fontSize: 16,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Description;
