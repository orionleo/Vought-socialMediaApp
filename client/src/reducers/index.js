import { combineReducers } from "redux";
import posts from "./posts.js";
import auth from "./Auth.js"

export default combineReducers({
    posts,auth
})