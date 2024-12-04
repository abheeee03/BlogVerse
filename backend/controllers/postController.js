const Post = require('../models/Post');

// Get all posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

// Get single post
exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
};

// Get posts by tag
exports.getPostsByTag = async (req, res, next) => {
  try {
    const tag = req.params.tag.toLowerCase();
    const posts = await Post.find({
      tags: { $regex: tag, $options: 'i' }
    }).sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

// Create new post
exports.createPost = async (req, res, next) => {
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
    next(error);
  }
};

// Update post
exports.updatePost = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, tags },
      { new: true }
    );
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
};

// Delete post
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
}; 