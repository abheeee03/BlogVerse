import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaTags } from 'react-icons/fa';
import { SidebarContext } from '../App';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);

  // Fetch all posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        const fetchedPosts = response.data;
        setAllPosts(fetchedPosts);
        setPosts(fetchedPosts);
      } catch (error) {
        // Handle error silently
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Filter posts when tag selection changes
  useEffect(() => {
    if (selectedTag) {
      const filteredPosts = allPosts.filter(post => 
        post.tags?.some(t => t.toLowerCase().includes(selectedTag.toLowerCase()))
      );
      setPosts(filteredPosts);
    } else {
      setPosts(allPosts);
    }
  }, [selectedTag, allPosts]);

  // Get unique tags from all posts
  const allTags = [...new Set(allPosts.flatMap(post => post.tags || []))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="md:pr-72">
        <div className="min-h-screen flex flex-col">
          <section className="text-gray-600 dark:text-gray-300 body-font overflow-hidden flex-grow">
            <div className="container px-5 py-6 mx-auto">
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center mb-2">
                  <FaTags className="mr-2" />
                  {selectedTag ? `Posts tagged with "${selectedTag}"` : "For You"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                      className={`text-sm font-medium px-3 py-0.5 rounded-full transition-colors ${
                        selectedTag === tag
                          ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="-my-3 divide-y divide-gray-100 dark:divide-gray-800">
                {posts.map((post) => (
                  <div key={post._id} className="py-3 flex flex-wrap md:flex-nowrap">
                    <div className="md:w-64 md:mb-0 mb-3 flex-shrink-0 flex flex-col">
                      <span className="font-semibold title-font text-gray-700 dark:text-gray-300">
                        {post.tags?.[0] || 'BLOG'}
                      </span>
                      <time className="mt-1 text-gray-500 dark:text-gray-400 text-sm">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                    <div className="md:flex-grow">
                      <h2 className="text-2xl font-medium text-gray-900 dark:text-white title-font mb-2">
                        {post.title}
                      </h2>
                      <p className="leading-relaxed line-clamp-3 mb-3 dark:text-gray-300">
                        {post.content}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags?.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`text-xs font-medium px-2.5 py-0.5 rounded-full transition-all ${
                              selectedTag === tag
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                      <Link
                        to={`/post/${post._id}`}
                        className="text-indigo-500 dark:text-indigo-400 inline-flex items-center hover:text-indigo-600 dark:hover:text-indigo-300"
                      >
                        Read More
                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14" />
                          <path d="M12 5l7 7-7 7" />
                        </svg>
                      </Link>
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

export default Homepage; 