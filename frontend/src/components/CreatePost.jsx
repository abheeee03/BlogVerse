import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPen } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import Sidebar from './Sidebar';
import { useContext } from 'react';
import { SidebarContext } from '../App';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      
      await axios.post('http://localhost:5000/api/posts', {
        title,
        content,
        tags: tagsArray,
        date: new Date().toISOString()
      });

      setShowSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/posts');
      }, 2000);

    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="md:pr-72">
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Success Popup */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
              >
                <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-200 px-8 py-4 rounded-lg shadow-lg flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Post published successfully!
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b dark:border-gray-700 flex items-center">
                <FaPen className="text-xl text-blue-600 dark:text-blue-400 mr-3" />
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Create New Post</h1>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Enter an engaging title"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content
                  </label>
                  <textarea
                    id="content"
                    rows="12"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    placeholder="Write your post content here..."
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-y"
                  />
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="technology, programming, web development"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Separate tags with commas
                  </p>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => navigate('/posts')}
                    className="mr-4 px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 dark:bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
                  >
                    Publish Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
};

export default CreatePost; 