import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiSettings, FiLogOut, FiChevronDown } from "react-icons/fi";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // useNavigate for programmatic navigation

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    // Remove the token from localStorage to log the user out
    localStorage.removeItem("authToken");

    // Redirect to the homepage
    navigate("/");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
          alt="Profile"
          className="w-8 h-8 rounded-full border-2 border-primary-light"
        />
        <FiChevronDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-gray-800 
                     shadow-lg border border-gray-200 dark:border-gray-700 py-2"
          >
            <Link
              to="/profile"
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 
                       hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <FiUser />
              <span>Profile</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 
                       hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <FiSettings />
              <span>Settings</span>
            </Link>
            <button
              className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 dark:text-red-400
                       hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => {
                handleSignOut(); // Call sign out handler
                setIsOpen(false); // Close the dropdown
              }}
            >
              <FiLogOut />
              <span>Sign Out</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
