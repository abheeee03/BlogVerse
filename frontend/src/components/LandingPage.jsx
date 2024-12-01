import React from 'react';
import { Link } from 'react-router-dom';
import { TbHexagonLetterB } from 'react-icons/tb';
import { FaArrowRight } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <TbHexagonLetterB className="text-6xl text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to BlogVerse
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            A personal journey through the world of technology, coding, and life as a developer.
            Join me as I share my experiences, learnings, and thoughts.
          </p>
          <Link
            to="/posts"
            className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
          >
            Read Blog Posts
            <FaArrowRight className="ml-2" />
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Personal Stories
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Real experiences and insights from my journey as a developer.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Tech Lifestyle
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Balancing coding, life, and continuous learning in tech.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Learning Together
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Sharing knowledge and growing as a community.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-24">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to dive in?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Explore my latest thoughts, experiences, and learnings.
          </p>
          <Link
            to="/posts"
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            Browse All Posts
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 