import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ParticleBackground from "./ParticleBackground.jsx";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { signupUser } from "../api/index.js";

export default function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signinHandler = async (userData) => {
    try {
      const response = await signupUser(userData);

      if (response.success) {
        navigate("/problems");
      } else {
        console.error("Signup failed:", response.message || "Unknown error");
        alert(response.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup. Please try again.");
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      name,
      username,
      email,
      password,
    };

    signinHandler(userData);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 pb-16">
      {/* Background particles effect */}
      <ParticleBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-4 px-6 py-8 bg-white/10 dark:bg-white/5 backdrop-blur-lg
                   rounded-2xl shadow-xl border border-white/20"
      >
        <div className="text-center mb-8">
          {/* Title and subtitle for the form */}
          <h2 className="text-3xl font-bold gradient-text mb-2">
            Create Account
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Join our coding community
          </p>
        </div>

        {/* Sign-up form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name Input Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                         bg-white/50 dark:bg-white/5 backdrop-blur-sm
                         focus:ring-2 focus:ring-primary-light focus:border-transparent
                         text-gray-900 dark:text-white placeholder-gray-500"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          {/* Username Input Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Username
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                         bg-white/50 dark:bg-white/5 backdrop-blur-sm
                         focus:ring-2 focus:ring-primary-light focus:border-transparent
                         text-gray-900 dark:text-white placeholder-gray-500"
                placeholder="Choose a username"
                required
              />
            </div>
          </div>

          {/* Email Address Input Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                         bg-white/50 dark:bg-white/5 backdrop-blur-sm
                         focus:ring-2 focus:ring-primary-light focus:border-transparent
                         text-gray-900 dark:text-white placeholder-gray-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password Input Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                         bg-white/50 dark:bg-white/5 backdrop-blur-sm
                         focus:ring-2 focus:ring-primary-light focus:border-transparent
                         text-gray-900 dark:text-white placeholder-gray-500"
                placeholder="Create a password"
                required
              />
            </div>
          </div>

          {/* Confirm Password Input Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                         bg-white/50 dark:bg-white/5 backdrop-blur-sm
                         focus:ring-2 focus:ring-primary-light focus:border-transparent
                         text-gray-900 dark:text-white placeholder-gray-500"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-3 px-4 rounded-xl bg-primary-light hover:bg-primary-dark
                     text-white font-medium transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light
                     hover:shadow-lg hover:shadow-primary-light/30"
          >
            Create Account
          </button>
        </form>

        {/* Link to sign-in page */}
        <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-primary-light hover:text-primary-dark font-medium"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
