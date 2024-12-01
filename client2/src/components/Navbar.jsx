import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Problems', path: '/problems' },
    { name: 'Learn', path: '#' },
    { name: 'Contest', path: '#' }
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/10 dark:bg-background-dark/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-primary-light to-primary-dark bg-clip-text text-transparent">
              CodeZen
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`text-lg transition-colors ${
                    location.pathname === item.path
                      ? 'text-primary-light'
                      : 'hover:text-primary-light'
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <ThemeToggle />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/signin')}
              className="bg-primary-light hover:bg-primary-dark text-white px-6 py-2 rounded-xl
                        font-semibold transition-colors duration-300
                        hover:ring-4 hover:ring-primary-light/30"
            >
              Sign In
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/10 dark:bg-background-dark/10 backdrop-blur-md"
          >
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block text-lg transition-colors ${
                    location.pathname === item.path
                      ? 'text-primary-light'
                      : 'hover:text-primary-light'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button 
                className="w-full bg-primary-light hover:bg-primary-dark text-white px-6 py-2 rounded-xl
                          font-semibold transition-colors duration-300"
                onClick={() => {
                  navigate('/signin');
                  setIsMenuOpen(false);
                }}
              >
                Sign In
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}