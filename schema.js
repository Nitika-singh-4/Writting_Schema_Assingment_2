const mongoose = require('mongoose');

// created one comments schema seperately
const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        description: 'Username of the commenter',
    },
    message: {  // typing mistake
        type: String,
        required: true,
        description: 'The comment text',
    },
    commentedAt: {
        type: Date,
        default: Date.now,
        description: 'Timestamp of the comment creation',
    },
});

// Blog post schema
const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        description: 'Title of the blog post',
    },
    content: {
        type: String,
        required: true,
        description: 'Content of the blog post', 
    },
    tags: {
        type: [String],
        description: 'Optional tags or keywords related to the post',
    },
    category: {
        type: String,
        default: 'General',
        description: 'Category of the blog post',
    },
    likes: {
        type: [String],
        description: 'Usernames of the users who liked the post',  
    },
    comments: [commentSchema], // added comments schema into the blog schema
    createdAt: {
        type: Date,
        default: Date.now,
        description: 'Timestamp of the post creation',
    },
    updatedAt: {  // Removed duplicate updatedAt which was present
        type: Date,
        description: 'Timestamp of the last update',  
    },
});

// Automatically update the 'updatedAt' field before saving
blogPostSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Create the model using this schema
const BlogPost = mongoose.model('BlogPost', blogPostSchema);
module.exports = BlogPost;
