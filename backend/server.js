const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Path to posts.json
const postsFile = path.join(__dirname, 'posts.json');

// Get all posts
app.get('/api/posts', (req, res) => {
    const posts = JSON.parse(fs.readFileSync(postsFile, 'utf8'));
    res.json(posts);
});

// Get single post
app.get('/api/posts/:id', (req, res) => {
    const posts = JSON.parse(fs.readFileSync(postsFile, 'utf8'));
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
});

// Create new post
app.post('/api/posts', (req, res) => {
    const posts = JSON.parse(fs.readFileSync(postsFile, 'utf8'));
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
        date: new Date().toISOString()
    };
    posts.push(newPost);
    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
    res.status(201).json(newPost);
});

// Update post
app.put('/api/posts/:id', (req, res) => {
    const posts = JSON.parse(fs.readFileSync(postsFile, 'utf8'));
    const index = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Post not found' });
    
    posts[index] = {
        ...posts[index],
        title: req.body.title,
        content: req.body.content
    };
    
    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
    res.json(posts[index]);
});

// Delete post
app.delete('/api/posts/:id', (req, res) => {
    const posts = JSON.parse(fs.readFileSync(postsFile, 'utf8'));
    const index = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Post not found' });
    
    const deletedPost = posts.splice(index, 1)[0];
    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
    res.json(deletedPost);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 