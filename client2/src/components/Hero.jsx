import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ParticleBackground from "./ParticleBackground";
import FloatingCube from "./FloatingCube";
import FeatureCard from "./FeatureCard";
import { FiCode, FiBookmark, FiLayers } from "react-icons/fi";
import { NavLink } from "react-router-dom";

export default function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const features = [
    {
      icon: <FiCode className="w-8 h-8" />,
      title: "Interactive Code Editor",
      description:
        "Solve DSA problems with our powerful built-in code editor supporting multiple programming languages.",
    },
    {
      icon: <FiLayers className="w-8 h-8" />,
      title: "Categorized Problems",
      description:
        "Find problems by difficulty level or topic - from arrays to dynamic programming.",
    },
    {
      icon: <FiBookmark className="w-8 h-8" />,
      title: "Smart Bookmarking",
      description:
        "Save interesting problems and track your progress with our intelligent bookmarking system.",
    },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <ParticleBackground />
      <FloatingCube />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-24"
      >
        <motion.div variants={itemVariants} className="text-center">
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 mt-8"
            style={{
              background:
                "linear-gradient(to right, #646cff, #535bf2, #646cff)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradient 3s linear infinite",
            }}
          >
            CodeZen
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-3xl mb-12 text-gray-600 dark:text-gray-300"
          >
            Master Data Structures & Algorithms
          </motion.p>

          <motion.div variants={itemVariants} className="mb-24">
            <NavLink to="/problems">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(100, 108, 255, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-light px-8 py-4 rounded-xl text-white font-bold text-xl
                        transform transition-all duration-300 hover:bg-primary-dark
                        hover:ring-4 hover:ring-primary-light/30"
              >
                Start Coding Now
              </motion.button>
            </NavLink>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
