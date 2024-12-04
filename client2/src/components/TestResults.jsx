import { motion } from "framer-motion";

export default function TestResults({ results }) {
  if (!results) return null;

  return (
    <motion.div
      id="test-results"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        Test Results ({results.passed}/{results.passed + results.failed} passed)
      </h3>
      <div className="space-y-4">
        {results.results.map((result, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${
              result.status === "passed"
                ? "border-green-200 dark:border-green-800"
                : "border-red-200 dark:border-red-800"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">
                  Test Case {index + 1}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Input: {result.input}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  result.status === "passed"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                }`}
              >
                {result.status}
              </span>
            </div>
            {result.status === "failed" && (
              <div className="mt-3 text-sm space-y-1">
                <p className="text-gray-600 dark:text-gray-400">
                  Expected:{" "}
                  <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">
                    {result.expected}
                  </code>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Got:{" "}
                  <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">
                    {result.output}
                  </code>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
