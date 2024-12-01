import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();

  // Predefined tags (same as in TagsNav)
  const predefinedTags = [
    "Programming",
    "Web Development",
    "Design",
    "Technology",
    "Frontend",
    "Backend",
    "Database",
    "DevOps",
    "Mobile",
    "AI/ML",
    "Security",
    "Cloud Computing",
    "Data Science",
    "UI/UX",
    "Testing",
    "Architecture",
    "Blockchain",
    "IoT",
    "APIs",
    "Performance"
  ];

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/posts', { 
        title, 
        content,
        tags: selectedTags 
      });
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Create New Post</h1>
        <Link
          to="/"
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
          ← Back to Posts
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            placeholder="Enter your post title"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg h-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            placeholder="Write your post content here..."
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Tags
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {predefinedTags.map((tag) => (
              <label
                key={tag}
                className="flex items-center space-x-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleTagToggle(tag)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {tag}
                </span>
              </label>
            ))}
          </div>
          {/* Selected tags preview */}
          {selectedTags.length > 0 && (
            <div className="mt-4">
              <div className="text-sm text-gray-500 mb-2">Selected tags:</div>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-4">
          <Link
            to="/"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Publish Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost; 