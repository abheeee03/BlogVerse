import { Link, NavLink } from 'react-router-dom';
import { TbHexagonLetterB } from "react-icons/tb";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="container mx-auto px-8 py-3">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-gray-700 transition-colors px-4 flex items-center gap-2">
            <TbHexagonLetterB className="text-blue-600 text-3xl" />
            BlogVerse
          </Link>
          <div className="flex items-center space-x-6 px-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-6 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/create"
              className={({ isActive }) =>
                `px-6 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`
              }
            >
              Create Post
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 