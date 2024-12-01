import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
        navigate('/');
      }
    };
    fetchPost();
  }, [id, navigate]);

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Navigation */}
      <Link
        to="/"
        className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-8 group"
      >
        <svg
          className="w-5 h-5 mr-2 transform transition-transform group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Posts
      </Link>

      {/* Main Article */}
      <article className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Article Header */}
        <div className="p-8 pb-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <time className="text-gray-500 text-sm">
              {new Date(post.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/?tag=${tag}`}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Article Content */}
        <div className="px-8 pb-8">
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              )
            ))}
          </div>
        </div>
      </article>

      {/* Read More Link */}
      <div className="mt-8 text-right">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          Read more posts
        </Link>
      </div>
    </div>
  );
};

export default PostDetail; 