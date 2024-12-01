import React from 'react';
import { Link } from 'react-router-dom';
import { TbHexagonLetterB } from 'react-icons/tb';

const NavBar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 px-2">
            <TbHexagonLetterB className="text-3xl text-indigo-600 dark:text-indigo-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">BlogVerse</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            <Link
              to="/posts"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors px-3 py-2"
            >
              Blog
            </Link>
            <Link
              to="/create"
              className="px-6 py-2.5 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
            >
              Create Post
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar; 