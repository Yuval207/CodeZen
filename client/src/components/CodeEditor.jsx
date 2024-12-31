import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlay,
  FiMenu,
  FiSend,
  FiHelpCircle,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import ParticleBackground from "./ParticleBackground";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { problems } from "../data/problems";
import {
  getProblemList,
  getCode,
  runProgram,
  getProblem,
  submitProgram,
} from "../api/index.js";
import TestResults from "./TestResults";
import ProblemDescription from "./ProblemDescription";

export default function CodeEditor() {
  const { id } = useParams();
  const problem = problems.find((p) => p.id === parseInt(id)) || problems[0];
  const [code, setCode] = useState("");
  const [testResults, setTestResults] = useState("");
  const [problemData, setProblemData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const testResultsRef = useRef(null);
  const [problemTitles, setProblemTitles] = useState([]);

  useEffect(() => {
    getProblemList().then((problems) => setProblemTitles(problems));
    getCode(id, "python").then((code) => setCode(code));
    getProblem(id).then((problems) => setProblemData(problems));
  }, []);

  useEffect(() => {
    getCode(id, "python").then((code) => setCode(code));
  }, [id]);

  const handleRunProgram = () => {
    setLoading(true); // Start loading
    runProgram(code, id, "python")
      .then((res) => {
        console.log(res);
        runTests(res);
      })
      .catch((err) => {
        setTestResults(err);
        console.log(err);
      })
      .finally(() => setLoading(false)); // Stop loading
  };

  const handleSubmitProgram = () => {
    setLoading(true); // Start loading
    submitProgram(code, id, "python")
      .then((res) => {
        console.log(res);
        runTests(res);
      })
      .catch((err) => {
        setTestResults(err);
        console.log(err);
      })
      .finally(() => setLoading(false)); // Stop loading
  };

  const handleEditorChange = (value, event) => {
    setCode(value);
  };

  const runTests = (testResults) => {
    // Test result processing logic remains unchanged
  };

  const handleProblemClick = (problemId) => {
    navigate(`/problem/${problemId}`);
    setIsSidebarOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            <Link
              to="/"
              className="text-3xl font-bold bg-gradient-to-r from-primary-light to-primary-dark bg-clip-text text-transparent"
            >
              CodeZen
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleRunProgram}
              disabled={loading} // Disable when loading
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary-light hover:bg-primary-dark text-white"
              }`}
            >
              {loading ? (
                <span className="loader">Loading...</span>
              ) : (
                <>
                  <FiPlay className="w-5 h-5" />
                  <span>Run</span>
                </>
              )}
            </button>

            <button
              onClick={handleSubmitProgram}
              disabled={loading} // Disable when loading
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              {loading ? (
                <span className="loader">Loading...</span>
              ) : (
                <>
                  <FiSend className="w-5 h-5" />
                  <span>Submit</span>
                </>
              )}
            </button>

            <button
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
                             text-gray-600 dark:text-gray-300 transition-colors"
            >
              <FiHelpCircle className="w-6 h-6" />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
                       text-gray-600 dark:text-gray-300 transition-colors"
            >
              {isDarkMode ? (
                <FiSun className="w-6 h-6" />
              ) : (
                <FiMoon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Problems Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="fixed left-0 top-16 bottom-0 w-72 bg-white dark:bg-gray-900
                     border-r border-gray-200 dark:border-gray-700 z-40
                     overflow-y-auto"
          >
            <div className="p-4">
              <h2 className="text-lg font-semibold mt-6 mb-4">Problems</h2>
              <div className="space-y-2">
                {problemTitles.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleProblemClick(p.id)}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
                             transition-colors duration-200"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{p.title}</span>
                      <span
                        className={`text-sm ${
                          p.difficulty === "Easy"
                            ? "text-green-500"
                            : p.difficulty === "Medium"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {p.difficulty}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="pt-16">
        <ParticleBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8">
            {/* Left Panel - Problem Description */}
            <ProblemDescription problem={problem} />

            {/* Right Panel - Code Editor and Test Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Code Editor */}
              <div className="h-[600px] rounded-xl overflowProblemDescription-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
                <Editor
                  height="100%"
                  language="python"
                  theme={isDarkMode ? "vs-dark" : "light"}
                  value={code}
                  onChange={handleEditorChange}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 20 },
                  }}
                />
              </div>

              {/* Test Results */}
              <div ref={testResultsRef}>
                <TestResults results={testResults} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
