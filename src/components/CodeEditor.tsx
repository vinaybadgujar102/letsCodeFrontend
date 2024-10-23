import AceEditor from "react-ace";
import Languages from "../constant/Languages";
import Themes from "../constant/Themes";

interface CodeEditorProps {
  language: string;
  setLanguage: (lang: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
  code: string;
  setCode: (code: string) => void;
  handleSubmission: () => void;
}

function CodeEditor({
  language,
  setLanguage,
  theme,
  setTheme,
  code,
  setCode,
  handleSubmission,
}: CodeEditorProps) {
  return (
    <div className="flex-grow flex flex-col">
      <div className="flex gap-x-2 justify-start items-center px-4 py-2">
        <button className="btn btn-success btn-sm" onClick={handleSubmission}>
          Submit
        </button>
        <button className="btn btn-warning btn-sm">Run Code</button>
        <select
          className="select select-sm select-info w-full max-w-xs"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {Languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.languageName}
            </option>
          ))}
        </select>
        <select
          className="select select-info w-full select-sm max-w-xs"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          {Themes.map((theme) => (
            <option key={theme.value} value={theme.value}>
              {theme.themeName}
            </option>
          ))}
        </select>
      </div>
      <div className="editorContainer flex-grow">
        <AceEditor
          mode={language}
          theme={theme}
          value={code}
          onChange={setCode}
          name="codeEditor"
          className="editor"
          style={{ width: "100%", height: "100%" }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            showLineNumbers: true,
            fontSize: 16,
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditor;
