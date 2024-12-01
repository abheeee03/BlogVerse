import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TagsNav from './TagsNav';
import Footer from './Footer';

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <section className="text-gray-600 body-font overflow-hidden flex-grow">
        <TagsNav onTagSelect={setSelectedTag} />
        
        <div className="container px-5 mx-auto pt-12">
          <div className="-my-8 divide-y-2 divide-gray-100">
            {posts.map((post) => (
              <div key={post.id} className="py-8 flex flex-wrap md:flex-nowrap">
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
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
                  <p className="leading-relaxed line-clamp-3 mb-4">
                    {post.content}
                  </p>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags && post.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`text-xs font-medium px-2.5 py-1 rounded-full transition-all ${
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
  );
};

export default Homepage; 