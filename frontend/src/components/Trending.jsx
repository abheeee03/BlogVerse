import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { IoTrendingUp } from "react-icons/io5";
import { SidebarContext } from '../App';

const Trending = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        const allPosts = response.data;
        
        // Shuffle posts and take first 6
        const shuffled = [...allPosts].sort(() => Math.random() - 0.5);
        const randomPosts = shuffled.slice(0, 6);
        
        setTrendingPosts(randomPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="md:pr-72">
        <div className="min-h-screen flex flex-col">
          <section className="text-gray-600 dark:text-gray-300 body-font overflow-hidden flex-grow">
            <div className="container px-5 py-8 mx-auto">
              {/* Header */}
              <div className="flex items-center mb-8">
                <IoTrendingUp className="text-3xl text-blue-600 dark:text-blue-400 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Trending Posts
                </h1>
              </div>

              {/* Trending Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {trendingPosts.map((post) => (
                  <div 
                    key={post._id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {post.tags && post.tags[0]}
                        </span>
                        <time className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </time>
                      </div>

                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {post.title}
                      </h2>

                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {post.content}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {post.tags && post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-medium px-2 py-1 rounded-md bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Link
                          to={`/post/${post._id}`}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm inline-flex items-center"
                        >
                          Read More
                          <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
};

export default Trending; 