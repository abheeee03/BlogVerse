import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPen } from 'react-icons/fa';
import { IoTrendingUp } from "react-icons/io5";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../App';

const Sidebar = ({ isOpen, onClose }) => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 md:top-16 right-0 h-screen md:h-[calc(100vh-4rem)] w-72 bg-white dark:bg-gray-800 shadow-lg md:shadow-none border-l dark:border-gray-700 z-50 md:z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:translate-x-0 overflow-y-auto`}
      >
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 mb-2">
          {/* Logo and Close Button */}
          <div className="flex items-center justify-between md:hidden">
            <Link to="/" className="flex items-center space-x-2" onClick={onClose}>
              <span className="text-2xl font-bold text-gray-800 dark:text-white">BlogVerse</span>
            </Link>
            {/* Close button for mobile */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Navigation Links */}
          <nav className="space-y-2">
            <Link
              to="/posts"
              onClick={onClose}
              className="flex items-center space-x-2 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FaHome className="text-lg text-gray-500 dark:text-gray-400" />
              <span className="font-medium">Home</span>
            </Link>
            <Link
              to="/trending"
              onClick={onClose}
              className="flex items-center space-x-2 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <IoTrendingUp className="text-lg text-gray-500 dark:text-gray-400" />
              <span className="font-medium">Trending</span>
            </Link>
            <Link
              to="/create"
              onClick={onClose}
              className="flex items-center space-x-2 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FaPen className="text-lg text-gray-500 dark:text-gray-400" />
              <span className="font-medium">Create Post</span>
            </Link>
          </nav>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="mt-8 w-full flex items-center justify-center space-x-2 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            {darkMode ? (
              <>
                <MdLightMode className="text-xl" />
                <span className="font-medium">Light Mode</span>
              </>
            ) : (
              <>
                <MdDarkMode className="text-xl" />
                <span className="font-medium">Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar; 