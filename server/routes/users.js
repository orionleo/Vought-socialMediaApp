import express from "express";
import {signin,signup,getUsers,updateUser, changePassword, googleSignIn} from "../controllers/user.js";


let router = express.Router();

router.get('/',getUsers);
router.post('/signin',signin);
router.post('/signup',signup);
router.patch('/:id',updateUser);
router.patch('/changePassword/:id',changePassword)
router.post('/googleSignIn',googleSignIn);

export default router;