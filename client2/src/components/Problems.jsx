import { motion } from "framer-motion";
import { FiCheck, FiX, FiCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "./ParticleBackground";
import { getProblemList } from "../api/index.js";
import { useState, useEffect } from "react";

const difficultyColors = {
  Easy: "text-green-500",
  Medium: "text-yellow-500",
  Hard: "text-red-500",
};

const StatusIcon = ({ status }) => {
  switch (status) {
    case "solved":
      return <FiCheck className="w-5 h-5 text-green-500" />;
    case "attempted":
      return <FiCircle className="w-5 h-5 text-yellow-500" />;
    default:
      return <FiX className="w-5 h-5 text-gray-400" />;
  }
};

export default function Problems() {
  const navigate = useNavigate();

  const [problems, setProblems] = useState([]);

  useEffect(() => {
    getProblemList().then((problems) => setProblems(problems));
  }, []);

  const handleProblemClick = (problemId) => {
    navigate(`/problem/${problemId}`);
  };

  return (
    <div className="relative min-h-screen pt-24 pb-12">
      <ParticleBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8 gradient-text">Problems</h1>

          <div className="bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-xl border border-gray-200 dark:border-white/20 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-200 font-semibold">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-200 font-semibold">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-200 font-semibold">
                      Difficulty
                    </th>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-200 font-semibold">
                      Topics
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {problems.map((problem) => (
                    <motion.tr
                      key={problem.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{
                        backgroundColor: "rgba(100, 108, 255, 0.05)",
                        transition: { duration: 0.2 },
                      }}
                      onClick={() => handleProblemClick(problem.id)}
                      className="border-b border-gray-100 dark:border-white/5 cursor-pointer
                               hover:shadow-md transition-all duration-200
                               text-gray-600 dark:text-gray-300"
                    >
                      <td className="px-6 py-4">
                        <StatusIcon status={problem.status} />
                      </td>
                      <td className="px-6 py-4 font-medium">{problem.title}</td>
                      <td
                        className={`px-6 py-4 font-medium ${
                          difficultyColors[problem.difficulty]
                        }`}
                      >
                        {problem.difficulty}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {problem.topics.map((topic) => (
                            <span
                              key={topic}
                              className="px-2 py-1 text-xs rounded-full 
                                       bg-primary-light/10 text-primary-light
                                       border border-primary-light/20"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
