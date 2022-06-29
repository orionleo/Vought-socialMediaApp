import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export let getPosts = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await PostMessage.countDocuments({});
        
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


export let getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await PostMessage.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPostsBySearch = async (req, res) => {
    
    const { searchQuery, tags } = req.query;
    
    try {
        const title = new RegExp(searchQuery, 'i');
        
        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] }).sort({ _id: -1 });
        
        res.status(200).json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export let createPost = async (req, res) => {
    const post = req.body;
    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, name,creator, createdAt,likes,comments,selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    
    const updatedPost = { creator,name,createdAt,likes,comments, title, message, tags, selectedFile, _id: id };
    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    
    res.status(202).json(updatedPost);
    
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    await PostMessage.findByIdAndRemove(id);
    
    res.json({ message: 'Post deleted successfully' });
}

export const likePost = async (req, res) => {
    
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    if (!req.userId) return res.json({ message: "Unauthenticated" });

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id == String(req.userId));

    if (index == -1) {
        //like the post
        post.likes.push(req.userId);

    }
    else {
        //dislike the post
        post.likes = post.likes.filter((id) => id != String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}

export const commentPost = async(req,res) =>{
    const {id} = req.params;
    const {value} = req.body;
    
    const post = await PostMessage.findById(id);
    
    post.comments.push(value);
    
    const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true});
    res.status(200).json(updatedPost);
}