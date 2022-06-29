import * as api from "../api/index.js";
import * as types from "../constants/actionTypes.js"



export const googleSignIn = (user,history) => async (dispatch) => {
    try {
        const {data} = await api.googleSignIn(user);
        if(data.message!=undefined){
            alert(data.message);
            return;
        }
        dispatch({type:types.AUTH,data});
        history(-1);
        
    } catch (error) {
        
    }
}

export const signin = (formData, history) => async (dispatch) => {
    //log in the user
    try {
        const { data } = await api.signIn(formData);
        // console.log(data);
        if(data.message!=undefined){
            if(data.message=='Invalid credentials'){
                history('/wrongpassword');
                return;
            }
            alert(data.message);
            return;
        }
        dispatch({ type: types.AUTH, data });
        history(-1);
        
    }
    catch (error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async (dispatch) => {
    //sign up the user
    try {
        const { data } = await api.signUp(formData);
        if(data.message!=undefined){
            alert(data.message);
            return;
        }
        
        dispatch({ type: types.AUTH, data });
        
        history('/');
    }
    catch (error) {
        console.log(error);
    }
    
}

export const updateUser = (id,newUser,history) => async (dispatch) => {
    try {
        const { data } = await api.updateUser(id, newUser);
        if(data.message!=undefined){
            alert(data.message);
            return;
        }
        dispatch({ type: types.UPDATE_USER, data });
        history('/');
        
    } catch (error) {
        
        console.log(error);
    }
}

export const changePassword = (id,user,history) => async(dispatch) =>{
    try {
        const {data} = await api.changePassword(id,user);
        if(data.message!=undefined){
            if(data.message=='Invalid credentials'){
                history('/wrongpassword');
                return;
            }
            if(data.message=='same password as before'){
                history('/samepassword');
                return;
            }

            alert(data.message);
            return;
        }
        dispatch({ type: types.UPDATE_USER, data });
        history('/ChangedPassword');
    } catch (error) {
        console.log(error);
    }
}