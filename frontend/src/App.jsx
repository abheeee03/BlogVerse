import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Homepage from './components/Homepage';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';

// Wrapper component to handle conditional navbar rendering
const AppContent = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {!isLandingPage && <NavBar />}
      <main className={!isLandingPage ? "pt-16" : ""}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/posts" element={<Homepage />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
