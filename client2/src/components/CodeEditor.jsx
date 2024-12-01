import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Editor from "@monaco-editor/react";
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiMenu, FiSend, FiHelpCircle, FiSun, FiMoon } from 'react-icons/fi';
import ParticleBackground from './ParticleBackground';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { problems } from '../data/problems';
import TestResults from './TestResults';
import ProblemDescription from './ProblemDescription';

export default function CodeEditor() {
  const { id } = useParams();
  const problem = problems.find(p => p.id === parseInt(id)) || problems[0];
  const [code, setCode] = useState(problem.starterCode);
  const [testResults, setTestResults] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const testResultsRef = useRef(null);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const runTests = () => {
    setTestResults({
      passed: 2,
      failed: 1,
      results: [
        { status: 'passed', input: '[2,7,11,15], 9', output: '[0,1]', expected: '[0,1]' },
        { status: 'passed', input: '[3,2,4], 6', output: '[1,2]', expected: '[1,2]' },
        { status: 'failed', input: '[3,3], 6', output: '[0,2]', expected: '[0,1]' }
      ]
    });

    setTimeout(() => {
      testResultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
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
            <h1 className="text-xl font-bold gradient-text">CodeZen</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={runTests}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg
                       bg-primary-light hover:bg-primary-dark text-white
                       transition-colors duration-300"
            >
              <FiPlay className="w-5 h-5" />
              <span>Run</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg
                             bg-green-500 hover:bg-green-600 text-white
                             transition-colors duration-300">
              <FiSend className="w-5 h-5" />
              <span>Submit</span>
            </button>
            
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
                             text-gray-600 dark:text-gray-300 transition-colors">
              <FiHelpCircle className="w-6 h-6" />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
                       text-gray-600 dark:text-gray-300 transition-colors"
            >
              {isDarkMode ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
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
              <h2 className="text-lg font-semibold mb-4">Problems</h2>
              <div className="space-y-2">
                {problems.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleProblemClick(p.id)}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
                             transition-colors duration-200"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{p.title}</span>
                      <span className={`text-sm ${
                        p.difficulty === 'Easy' ? 'text-green-500' :
                        p.difficulty === 'Medium' ? 'text-yellow-500' :
                        'text-red-500'
                      }`}>
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
              <div className="h-[600px] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
                <Editor
                  height="100%"
                  defaultLanguage="javascript"
                  theme={isDarkMode ? 'vs-dark' : 'light'}
                  value={code}
                  onChange={handleEditorChange}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 20 }
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