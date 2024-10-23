import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface ProblemStatementProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sanitizedMarkdown: string;
}

function ProblemStatement({
  activeTab,
  setActiveTab,
  sanitizedMarkdown,
}: ProblemStatementProps) {
  const isActiveTab = (tabName: string) => {
    if (activeTab === tabName) {
      return "tab tab-active";
    }
    return "tab";
  };

  return (
    <>
      <div role="tablist" className="tabs tabs-boxed w-3/5">
        <a
          role="tab"
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
        <Markdown
          rehypePlugins={[rehypeRaw]}
          className="prose prose-stone max-w-none prose-headings:text-white prose-strong:text-white text-white !important"
        >
          {sanitizedMarkdown}
        </Markdown>
      </div>
    </>
  );
}

export default ProblemStatement;
