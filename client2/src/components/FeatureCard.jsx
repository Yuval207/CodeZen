import { motion } from 'framer-motion';

export default function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 lg:p-8 rounded-2xl bg-white/10 backdrop-blur-lg
                border border-white/20 shadow-xl
                transform transition-all duration-300
                hover:bg-white/20"
    >
      <div className="flex items-center justify-center mb-6 text-primary-light">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        {title}
      </h3>
      <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </motion.div>
  );
}