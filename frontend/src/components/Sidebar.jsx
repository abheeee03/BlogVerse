import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPen } from 'react-icons/fa';
import { IoTrendingUp } from "react-icons/io5";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white h-screen fixed right-0 top-0 border-l overflow-y-auto">
      <div className="p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 mb-8">
          <span className="text-2xl font-bold text-gray-800">BlogVerse</span>
        </Link>

        {/* Navigation Links */}
        <nav className="space-y-2">
          <Link
            to="/"
            className="flex items-center space-x-2 px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaHome className="text-gray-500" />
            <span>Home</span>
          </Link>
          <Link
            to="/trending"
            className="flex items-center space-x-2 px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <IoTrendingUp className="text-gray-500" />
            <span>Trending</span>
          </Link>
          <Link
            to="/create"
            className="flex items-center space-x-2 px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaPen className="text-gray-500" />
            <span>Create Post</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar; 