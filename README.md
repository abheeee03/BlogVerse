# BlogVerse

A modern, full-stack blogging platform built with React and Node.js, featuring AI-powered content generation.

## 🌟 Features

### Core Features
- Create and read blog posts
- Modern, responsive UI with dark mode support
- Tag-based post categorization
- Real-time content updates
- MongoDB-based data persistence

### AI Integration
- AI-powered blog content generation using Google's Gemini AI
- Smart description generation based on titles
- Intelligent content structuring

### User Experience
- Responsive design for all devices
- Dark/Light mode support
- Tag-based post filtering
- Clean and modern UI with animations
- Rich text content support

## 🛠️ Tech Stack

### Frontend
- **React** (Vite) - For building the user interface
- **React Router** - For navigation
- **Tailwind CSS** - For styling
- **Axios** - For API requests
- **Framer Motion** - For animations
- **React Icons** - For UI icons

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **Google Generative AI** - For AI content generation
- **CORS** - For cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Google AI Studio API key

### Environment Setup

1. Backend Environment Variables (.env):
\`\`\`env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_api_key
ALLOWED_ORIGINS=http://localhost:5173
\`\`\`

2. Frontend Environment Variables (.env):
\`\`\`env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=BlogVerse
\`\`\`

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/blogverse.git
cd blogverse
\`\`\`

2. Install backend dependencies:
\`\`\`bash
cd backend
npm install
\`\`\`

3. Install frontend dependencies:
\`\`\`bash
cd ../frontend
npm install
\`\`\`

### Running the Application

1. Start the backend server:
\`\`\`bash
cd backend
npm run dev
\`\`\`

2. Start the frontend development server:
\`\`\`bash
cd frontend
npm run dev
\`\`\`

3. Open your browser and visit \`http://localhost:5173\`

## 📦 Project Structure

\`\`\`
blogverse/
├── backend/
│   ├── models/
│   │   └── Post.js
│   ├── .env
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── CreatePost.jsx
    │   │   ├── Homepage.jsx
    │   │   ├── PostDetail.jsx
    │   │   ├── PostList.jsx
    │   │   ├── Trending.jsx
    │   │   └── Sidebar.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env
    └── package.json
\`\`\`

## 🌐 API Endpoints

### Posts
- \`GET /api/posts\` - Get all posts
- \`GET /api/posts/:id\` - Get a specific post
- \`GET /api/posts/tag/:tag\` - Get posts by tag
- \`POST /api/posts\` - Create a new post
- \`PUT /api/posts/:id\` - Update a post
- \`DELETE /api/posts/:id\` - Delete a post

### AI Generation
- \`POST /api/generate-description\` - Generate AI content

## 🚀 Deployment

### Backend (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure environment variables
4. Deploy the service

### Frontend (Vercel)
1. Push code to GitHub
2. Import project to Vercel
3. Configure environment variables
4. Deploy

## 🔒 Security Features

- CORS protection
- Environment variable management
- MongoDB connection security
- Error handling middleware
- Production/Development environment separation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Generative AI for content generation
- MongoDB Atlas for database hosting
- Render and Vercel for hosting services