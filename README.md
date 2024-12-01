# BlogVerse

A modern blogging platform built with React and Node.js.

## Features

- Create and read blog posts
- Modern, responsive UI
- Real-time updates
- JSON-based data storage

## Tech Stack

- Frontend:
  - React (Vite)
  - React Router
  - Tailwind CSS
  - Axios
  - React Icons

- Backend:
  - Node.js
  - Express
  - File-based storage (posts.json)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/blogverse.git
cd blogverse
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open your browser and visit `http://localhost:5173`

## Project Structure

```
blogverse/
├── backend/
│   ├── posts.json
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 