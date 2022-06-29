import axios from "axios";

const API = axios.create({ baseURL: "https://mern-social-media-123.herokuapp.com/" })
API.interceptors.request.use(
    function (req) {
        if(localStorage.getItem('profile')){
            req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
        }
        const controller = new AbortController();
        const cfg = {
            ...req,
            signal: controller.signal,
        };
        return cfg;
    },
    // function (req) {
    //     return req;
    // },
);

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search||'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value,id) => API.post(`/posts/${id}/commentPost`,{value})
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const updateUser = (id,newUser) =>API.patch(`/user/${id}`,newUser);
export const googleSignIn = (user) =>API.post('/user/googleSignIn',user);
export const changePassword = (id,user) =>API.patch(`/user/changePassword/${id}`,user);