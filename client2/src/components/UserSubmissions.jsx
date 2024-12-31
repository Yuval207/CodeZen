import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// const submissions = [
//   {
//     id: 1,
//     problem: "Two Sum",
//     difficulty: "Easy",
//     status: "Accepted",
//     language: "JavaScript",
//     date: "2024-02-10",
//   },
//   {
//     id: 2,
//     problem: "Add Two Numbers",
//     difficulty: "Medium",
//     status: "Wrong Answer",

//     language: "Python",
//     date: "2024-02-09",
//   },
//   // Add more submissions as needed
// ];

const statusColors = {
  Accepted: "text-green-500",
  "Wrong Answer": "text-red-500",
  "Time Limit Exceeded": "text-yellow-500",
};

const difficultyColors = {
  Easy: "text-green-500",
  Medium: "text-yellow-500",
  Hard: "text-red-500",
};

export default function UserSubmissions({ userSubmissions }) {
  let submissions = [];
  if (userSubmissions) {
    submissions = userSubmissions.map((item) => ({
      id: item.problemId,
      problem: item.problemTitle,
      difficulty: item.Difficulty,
      status: item.status === "Accepted" ? "Accepted" : "Wrong Answer",
      language: item.language,
      date: item.date,
    }));
  }

  return (
    <div
      className="bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-xl 
                  border border-gray-200 dark:border-white/20"
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold">Recent Submissions</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left bg-gray-50/50 dark:bg-gray-800/50">
              <th className="px-6 py-3 text-gray-600 dark:text-gray-400">
                Problem
              </th>
              <th className="px-6 py-3 text-gray-600 dark:text-gray-400">
                Difficulty
              </th>
              <th className="px-6 py-3 text-gray-600 dark:text-gray-400">
                Status
              </th>
              <th className="px-6 py-3 text-gray-600 dark:text-gray-400">
                Language
              </th>
              <th className="px-6 py-3 text-gray-600 dark:text-gray-400">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <motion.tr
                key={submission.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-t border-gray-100 dark:border-gray-700 cursor-pointer"
                onClick={() =>
                  (window.location.href = `/problem/${submission.id}`)
                }
              >
                <td className="px-6 py-4 text-gray-900 dark:text-white">
                  {submission.problem}
                </td>
                <td
                  className={`px-6 py-4 ${
                    difficultyColors[submission.difficulty]
                  }`}
                >
                  {submission.difficulty}
                </td>
                <td className={`px-6 py-4 ${statusColors[submission.status]}`}>
                  {submission.status}
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {submission.language}
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {submission.date}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
