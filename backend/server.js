const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Path to posts.json
const postsFile = path.join(__dirname, 'posts.json');

// Ensure posts.json exists
if (!fs.existsSync(postsFile)) {
  fs.writeFileSync(postsFile, '[]', 'utf8');
}

// Wrap file operations in try-catch
const readPosts = () => {
  try {
    return JSON.parse(fs.readFileSync(postsFile, 'utf8'));
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
};

const writePosts = (posts) => {
  try {
    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing posts:', error);
    return false;
  }
};

// Get all posts
app.get('/api/posts', (req, res) => {
  try {
    const posts = readPosts();
    res.json(posts.sort((a, b) => new Date(b.date) - new Date(a.date)));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// Get posts by tag
app.get('/api/posts/tag/:tag', (req, res) => {
  try {
    const posts = readPosts();
    const tag = req.params.tag.toLowerCase();
    const filteredPosts = posts.filter(post => 
      post.tags && post.tags.some(t => t.toLowerCase().includes(tag))
    );
    res.json(filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date)));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts by tag' });
  }
});

// Get single post
app.get('/api/posts/:id', (req, res) => {
  try {
    const posts = readPosts();
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post' });
  }
});

// Create new post
app.post('/api/posts', (req, res) => {
  try {
    const posts = readPosts();
    const newPost = {
      id: posts.length + 1,
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags || [],
      date: new Date().toISOString()
    };
    posts.push(newPost);
    if (writePosts(posts)) {
      res.status(201).json(newPost);
    } else {
      res.status(500).json({ message: 'Error saving post' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
});

// Update post
app.put('/api/posts/:id', (req, res) => {
  try {
    const posts = readPosts();
    const index = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Post not found' });
    
    posts[index] = {
      ...posts[index],
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags || posts[index].tags
    };
    
    if (writePosts(posts)) {
      res.json(posts[index]);
    } else {
      res.status(500).json({ message: 'Error updating post' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating post' });
  }
});

// Delete post
app.delete('/api/posts/:id', (req, res) => {
  try {
    const posts = readPosts();
    const index = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Post not found' });
    
    const deletedPost = posts.splice(index, 1)[0];
    if (writePosts(posts)) {
      res.json(deletedPost);
    } else {
      res.status(500).json({ message: 'Error deleting post' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 