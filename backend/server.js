require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Post = require('./models/Post');

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:5173', 'https://blogverse-frontend.vercel.app'];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.use(express.json());

// Connect to MongoDB with retry logic
const connectDB = async (retries = 5) => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(process.env.MONGODB_URI, options);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    if (retries > 0) {
      console.log(`MongoDB connection failed. Retrying... (${retries} attempts left)`);
      setTimeout(() => connectDB(retries - 1), 5000);
    } else {
      console.error('MongoDB connection failed after all retries');
      process.exit(1);
    }
  }
};

// Initialize MongoDB connection
connectDB();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: isProduction ? 'Internal Server Error' : err.message,
    error: isProduction ? {} : err
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString() 
  });
});

// Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// Get posts by tag
app.get('/api/posts/tag/:tag', async (req, res) => {
  try {
    const tag = req.params.tag.toLowerCase();
    const posts = await Post.find({
      tags: { $regex: tag, $options: 'i' }
    }).sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts by tag' });
  }
});

// Get single post
app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post' });
  }
});

// Create new post
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const post = new Post({
      title,
      content,
      tags: tags || [],
      date: new Date()
    });
    
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
});

// Update post
app.put('/api/posts/:id', async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, tags },
      { new: true }
    );
    
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post' });
  }
});

// Delete post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
});

// Generate blog description using AI
app.post('/api/generate-description', async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: 'Gemini API key not configured' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Generate a concise and engaging description/summary for a blog post with the title: "${title}".
    The description should be approximately 2-3 sentences long (50-70 words), capturing the main idea or hook of what the blog post would be about.
    Make it compelling and informative, suitable for a blog post preview or meta description.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const description = response.text();

    res.json({ description });
  } catch (error) {
    console.error('Error generating description:', error);
    res.status(500).json({ message: 'Error generating description', error: error.message });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
}); 