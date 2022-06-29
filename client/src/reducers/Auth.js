import * as actionTypes from "../constants/actionTypes.js"

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case actionTypes.AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action.data };
        case actionTypes.UPDATE_USER:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action.data };
        case actionTypes.LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };
        default:
            return state;
    }
}

export default authReducer;