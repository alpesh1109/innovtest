import { USER_DATA, LOGIN_DATA, LOGIN_STATUS, BLOG_DATA } from '../actions/types';

const initialState = {
    userdata: [],
    logindata: [],
    blogdata: []
}

export default function (state = initialState, action) {

    switch (action.type) {

        case USER_DATA:
            return {
                ...state,
                userdata: action.payload
            };

        case LOGIN_DATA:
            return {
                ...state,
                logindata: action.payload, login: true
            };
        case LOGIN_STATUS:
            return {
                ...state,
                logindata: action.payload, login: false
            };
        case BLOG_DATA:
            return {
                ...state,
                blogdata: action.payload
            };
        default:
            return { ...state, login: false };
    }
}