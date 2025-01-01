import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiAward,
  FiCode,
  FiTrendingUp,
} from "react-icons/fi";
import ParticleBackground from "./ParticleBackground";
import UserStats from "./UserStats";
import UserSubmissions from "./UserSubmissions";
import { getUserData } from "../api/index.js";
import { useEffect, useState } from "react";

export default function UserProfile() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserData().then((userdata) => setUserData(userdata));
  }, []);

  return (
    <div className="relative min-h-screen pt-24 pb-12">
      <ParticleBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Profile Header */}
          <div
            className="bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-xl p-6 
                        border border-gray-200 dark:border-white/20"
          >
            <div className="flex items-start space-x-6">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-primary-light"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold">{userData.name}</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      @{userData.username}
                    </p>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      {userData.bio}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <a
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-light"
                    >
                      <FiGithub size={20} />
                    </a>
                    <a
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-light"
                    >
                      <FiLinkedin size={20} />
                    </a>
                    <a
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-light"
                    >
                      <FiTwitter size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UserStats
              icon={<FiCode />}
              title="Problems Solved"
              value={
                userData && userData.difficulty
                  ? userData.difficulty.easy +
                    userData.difficulty.medium +
                    userData.difficulty.hard
                  : 0 // Fallback value if userData or difficulty is undefined
              }
              color="text-green-500"
            />
            <UserStats
              icon={<FiAward />}
              title="Bookmarks"
              value={
                userData && userData.bookmarks ? userData.bookmarks.length : 0
              }
              color="text-yellow-500"
            />
            <UserStats
              icon={<FiTrendingUp />}
              title="Daily Streak"
              value={userData.dailyStreak}
              color="text-red-500"
            />
          </div>

          {/* Submissions History */}
          <UserSubmissions userSubmissions={userData.submissions} />
        </motion.div>
      </div>
    </div>
  );
}
