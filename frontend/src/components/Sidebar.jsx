import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPen } from 'react-icons/fa';
import { IoTrendingUp } from "react-icons/io5";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const Sidebar = () => {
  const [darkMode, setDarkMode] = React.useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 h-screen fixed right-0 top-0 border-l dark:border-gray-700 overflow-y-auto">
      <div className="p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 mb-8">
          <span className="text-2xl font-bold text-gray-800 dark:text-white">BlogVerse</span>
        </Link>

        {/* Navigation Links */}
        <nav className="space-y-2">
          <Link
            to="/posts"
            className="flex items-center space-x-2 px-4 py-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FaHome className="text-gray-500 dark:text-gray-400" />
            <span>Home</span>
          </Link>
          <Link
            to="/trending"
            className="flex items-center space-x-2 px-4 py-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <IoTrendingUp className="text-gray-500 dark:text-gray-400" />
            <span>Trending</span>
          </Link>
          <Link
            to="/create"
            className="flex items-center space-x-2 px-4 py-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FaPen className="text-gray-500 dark:text-gray-400" />
            <span>Create Post</span>
          </Link>
        </nav>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mt-8 w-full flex items-center justify-center space-x-2 px-4 py-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          {darkMode ? (
            <>
              <MdLightMode className="text-xl" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <MdDarkMode className="text-xl" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar; 