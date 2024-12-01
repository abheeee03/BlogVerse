import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Homepage from './components/Homepage';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import Trending from './components/Trending';

export const ThemeContext = createContext();
export const SidebarContext = createContext();

// Wrapper component to handle conditional navbar rendering
const AppContent = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const { isSidebarOpen, setIsSidebarOpen } = React.useContext(SidebarContext);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {!isLandingPage && <NavBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />}
      <main className={!isLandingPage ? "pt-16" : ""}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/posts" element={<Homepage />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/trending" element={<Trending />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : true;
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
        <Router>
          <AppContent />
        </Router>
      </SidebarContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
