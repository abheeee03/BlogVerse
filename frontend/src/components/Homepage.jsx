import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { FaTags } from 'react-icons/fa';

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState(null);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        const fetchedPosts = response.data;
        setAllPosts(fetchedPosts);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (selectedTag) {
      const filteredPosts = allPosts.filter(post => 
        post.tags && post.tags.some(t => 
          t.toLowerCase().includes(selectedTag.toLowerCase())
        )
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <main className="flex-1 mr-64">
        <div className="min-h-screen flex flex-col">
          <section className="text-gray-600 body-font overflow-hidden flex-grow">
            <div className="container px-5 mx-auto">
              {/* Tags Section */}
              <div className="mb-2">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
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
                          ? 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Posts List */}
              <div className="-my-3 divide-y divide-gray-100">
                {posts.map((post) => (
                  <div key={post.id} className="py-3 flex flex-wrap md:flex-nowrap">
                    <div className="md:w-64 md:mb-0 mb-3 flex-shrink-0 flex flex-col">
                      <span className="font-semibold title-font text-gray-700">
                        {post.tags && post.tags.length > 0 ? post.tags[0] : 'BLOG'}
                      </span>
                      <time className="mt-1 text-gray-500 text-sm">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                    <div className="md:flex-grow">
                      <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                        {post.title}
                      </h2>
                      <p className="leading-relaxed line-clamp-3 mb-3">
                        {post.content}
                      </p>
                      {/* Post Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags && post.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`text-xs font-medium px-2.5 py-0.5 rounded-full transition-all ${
                              selectedTag === tag
                                ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                      <Link
                        to={`/post/${post.id}`}
                        className="text-indigo-500 inline-flex items-center hover:text-indigo-600"
                      >
                        Read More
                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
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
      </main>
      <Sidebar />
    </div>
  );
};

export default Homepage; 