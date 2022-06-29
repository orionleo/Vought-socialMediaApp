import express from "express";

import {getPosts,createPost,updatePost,deletePost,getPost,likePost,getPostsBySearch,commentPost} from "../controllers/posts.js";
import auth from "../middleware/auth.js"


let router = express.Router();

//localhost:8000/posts
router.get('/',getPosts);
router.get('/search',getPostsBySearch);
router.get('/:id',getPost);
router.post('/',auth,createPost);
router.patch('/:id',auth,updatePost);
router.delete('/:id',auth,deletePost);
router.patch('/:id/likePost',auth,likePost);
router.post('/:id/commentPost',auth,commentPost)

export default router; 