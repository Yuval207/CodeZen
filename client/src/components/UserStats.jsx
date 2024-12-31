import { motion } from "framer-motion";

export default function UserStats({ icon, title, value, subtitle, color }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-xl p-6
                border border-gray-200 dark:border-white/20"
    >
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg bg-opacity-10 ${color} bg-current`}>
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
}
