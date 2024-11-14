import { format } from "date-fns";
import { useState } from "react";

interface Submission {
  _id: string;
  status: string;
  language: string;
  updatedAt: string;
  executionTime: number;
  code: string;
}

interface SubmissionsProps {
  submissions: Submission[];
}

export default function Submissions({ submissions }: SubmissionsProps) {
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "ACCEPTED":
        return "text-green-500";
      case "WRONG_ANSWER":
        return "text-red-500";
      case "TIME_LIMIT_EXCEEDED":
        return "text-yellow-500";
      case "RUNTIME_ERROR":
        return "text-orange-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toUpperCase()) {
      case "ACCEPTED":
        return "Accepted";
      case "WRONG_ANSWER":
        return "Wrong Answer";
      case "TIME_LIMIT_EXCEEDED":
        return "Time Limit Exceeded";
      case "RUNTIME_ERROR":
        return "Runtime Error";
      default:
        return status;
    }
  };

  const handleRowClick = (submission: Submission) => {
    setSelectedSubmission(submission);
  };

  const closeModal = () => {
    setSelectedSubmission(null);
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-800">
              <th className="text-gray-300">Status</th>
              <th className="text-gray-300">Language</th>
              <th className="text-gray-300">Time</th>
              <th className="text-gray-300">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-gray-400 py-4">
                  No submissions yet
                </td>
              </tr>
            ) : (
              submissions.map((submission) => (
                <tr
                  key={submission._id}
                  className="border-b border-gray-700 hover:bg-gray-700 cursor-pointer transition-colors"
                  onClick={() => handleRowClick(submission)}
                >
                  <td
                    className={`${getStatusColor(
                      submission.status
                    )} font-medium`}
                  >
                    {getStatusText(submission.status)}
                  </td>
                  <td className="text-gray-300">{submission.language}</td>
                  <td className="text-gray-300">
                    {submission.executionTime}ms
                  </td>
                  <td className="text-gray-300">
                    {format(
                      new Date(submission.updatedAt),
                      "MMM dd, yyyy HH:mm"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Code Preview Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg w-3/4 max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <div>
                <span className="text-gray-300 mr-4">
                  Submission Details -{" "}
                  {format(
                    new Date(selectedSubmission.updatedAt),
                    "MMM dd, yyyy HH:mm"
                  )}
                </span>
                <span
                  className={`${getStatusColor(
                    selectedSubmission.status
                  )} font-medium`}
                >
                  {getStatusText(selectedSubmission.status)}
                </span>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[calc(80vh-4rem)]">
              <pre className="text-gray-300 font-mono whitespace-pre-wrap">
                {selectedSubmission.code}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
