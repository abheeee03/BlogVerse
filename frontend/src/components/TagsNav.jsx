import { useState, useEffect } from 'react';

const TagsNav = ({ onTagSelect }) => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [randomTags, setRandomTags] = useState([]);

  // All available tags
  const allTags = [
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

  useEffect(() => {
    // Generate new random tags on component mount (page load)
    const shuffled = [...allTags].sort(() => 0.5 - Math.random());
    const newRandomTags = shuffled.slice(0, 8);
    setRandomTags(newRandomTags);
  }, []); // Run once on component mount

  const handleTagClick = (tag) => {
    const newSelectedTag = selectedTag === tag ? null : tag;
    setSelectedTag(newSelectedTag);
    onTagSelect(newSelectedTag);
  };

  return (
    <div className="fixed top-16 left-0 right-0 bg-white z-40 shadow-sm">
      <div className="container mx-auto px-5 py-4">
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => handleTagClick(null)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all transform ${
              selectedTag === null
                ? 'bg-blue-600 text-white shadow-md scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            For You
          </button>
          {randomTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all transform ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white shadow-md scale-105 ring-2 ring-blue-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-102'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagsNav; 