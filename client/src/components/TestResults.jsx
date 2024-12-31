import { motion } from "framer-motion";
import { FiCheckCircle, FiXCircle, FiAlertTriangle } from "react-icons/fi";
// import { useEffect, useState } from "react";
// import { getProblemDescription } from "../../api/index.js";

const ResultIcon = ({ status }) => {
  switch (status) {
    case "passed":
      return <FiCheckCircle className="w-6 h-6 text-green-500" />;
    case "failed":
      return <FiXCircle className="w-6 h-6 text-red-500" />;
    case "error":
      return <FiAlertTriangle className="w-6 h-6 text-red-800" />;
    default:
      return null;
  }
};

const ResultBadge = ({ status }) => {
  const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
  const statusClasses = {
    passed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
    error:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  };

  return (
    <span className={`${baseClasses} ${statusClasses[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const ErrorDetails = ({ error }) => {
  if (!error) return null;

  return (
    <div className="mt-3 text-sm space-y-2">
      <p className="text-gray-700 dark:text-gray-300 font-medium">
        Error Details:
      </p>
      <pre
        className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 
                    text-red-600 dark:text-red-400 overflow-x-auto"
      >
        {error.message || error}
      </pre>
    </div>
  );
};

export default function TestResults({ results }) {
  if (!results) return null;

  const { passed, failed, error } = results;
  const totalTests = passed + failed + (error ? 1 : 0);

  return (
    <motion.div
      id="test-results"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
    >
      {/* Summary Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Test Results
        </h3>
        <div className="flex items-center space-x-4">
          {passed > 0 && (
            <span className="text-sm text-green-600 dark:text-green-400">
              {passed} passed
            </span>
          )}
          {failed > 0 && (
            <span className="text-sm text-red-600 dark:text-red-400">
              {failed} failed
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div className="h-full flex">
          {passed > 0 && (
            <div
              className="bg-green-500"
              style={{ width: `${(passed / totalTests) * 100}%` }}
            />
          )}
          {failed > 0 && (
            <div
              className="bg-red-500"
              style={{ width: `${(failed / totalTests) * 100}%` }}
            />
          )}
          {error && (
            <div
              className="bg-red-800"
              style={{ width: `${(1 / totalTests) * 100}%` }}
            />
          )}
        </div>
      </div>

      {/* Test Cases */}
      <div className="space-y-4">
        {error ? (
          <div className="p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <ResultIcon status="error" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    Code Execution Error
                  </h4>
                </div>
              </div>
              <ResultBadge status="error" />
            </div>
            <ErrorDetails error={error} />
          </div>
        ) : (
          results.results.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                result.status === "passed"
                  ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20"
                  : "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <ResultIcon status={result.status} />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      Test Case {index + 1}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Input:{" "}
                      <code className="px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800">
                        {result.input}
                      </code>
                    </p>
                  </div>
                </div>
                <ResultBadge status={result.status} />
              </div>

              {result.status === "failed" && (
                <div className="mt-3 text-sm space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Expected:
                    </span>
                    <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">
                      {result.expected}
                    </code>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Got:
                    </span>
                    <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">
                      {result.output}
                    </code>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}
