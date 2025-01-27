const express = require('express');
const BlogPost = require('./schema');
const router = express.Router();

router.post('/posts', async (req, res) => {
    try {
        const newPost = new BlogPost(req.body);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error('Error creating post:', error);  //error log
        res.status(400).json({ error: error.message || 'Error creating post' });  // shwoing error details
    }
});

router.get('/post', async (req, res) => {
    try {
        const posts = await BlogPost.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching posts' });
    }
});

module.exports = router;
