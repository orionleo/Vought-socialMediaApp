import * as api from "../api/index.js";
import * as types from "../constants/actionTypes.js"
// import {useDispatch as dispatch} from "react-redux";

//action creators
export const getPosts = (page) => async (dispatch) => {

    try {
        dispatch({ type: types.START_LOADING });
        const { data } = await api.fetchPosts(page);
        dispatch({ type: types.FETCH_ALL, payload: data });
       
            dispatch({ type: types.END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getPost = (id) => async (dispatch) => {

    try {
        dispatch({ type: types.START_LOADING });
        const { data } = await api.fetchPost(id);
        dispatch({ type: types.FETCH_POST, payload: data });
       
            dispatch({ type: types.END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: types.START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: types.FETCH_BY_SEARCH, payload: data });

        dispatch({ type: types.END_LOADING });
        
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post, history) => async (dispatch) => {
    try {
        dispatch({ type: types.START_LOADING });
        const { data } = await api.createPost(post);
        history(`/posts/${data?._id}`);
        dispatch({ type: types.CREATE, payload: data });
        dispatch({ type: types.END_LOADING });
    } catch (error) {
        console.log(error);

    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        dispatch({ type: types.START_LOADING });
        const { data } = await api.updatePost(id, post);
        dispatch({ type: types.UPDATE, payload: data });
        dispatch({ type: types.END_LOADING });
        
    } catch (error) {

        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        dispatch({ type: types.START_LOADING });
        await api.deletePost(id);
        
        dispatch({ type: types.DELETE, payload: id });
        dispatch({ type: types.END_LOADING });
        window.location.reload(false);
    
    } catch (error) {

        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: types.LIKE, payload: data });

    } catch (error) {

        console.log(error);
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id);
        dispatch({ type: types.COMMENT, payload: data });

        return data.comments;

    } catch (error) {
        console.log(error);
    }
}
