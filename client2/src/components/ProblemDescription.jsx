import { motion } from "framer-motion";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useTheme } from "../hooks/useTheme";

export default function ProblemDescription({ problem }) {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="wmde-markdown-var">
        <MarkdownPreview
          source={problem.description}
          style={{
            backgroundColor: "transparent",
            color: "inherit",
          }}
          wrapperElement={{
            "data-color-mode": isDarkMode ? "dark" : "light",
          }}
          className="prose dark:prose-invert max-w-none
                     prose-headings:text-gray-900 dark:prose-headings:text-white
                     prose-p:text-gray-700 dark:prose-p:text-gray-300
                     prose-strong:text-gray-900 dark:prose-strong:text-white
                     prose-code:text-primary-light
                     prose-code:bg-gray-100 dark:prose-code:bg-gray-800/50
                     prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
                     prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800/50
                     prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700
                     prose-pre:rounded-lg"
        />
      </div>
    </motion.div>
  );
}
