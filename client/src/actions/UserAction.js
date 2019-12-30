import { USER_DATA, LOGIN_DATA, LOGIN_STATUS, BLOG_DATA } from './types';
import axios from 'axios';


export const getuserdata = (callback) => dispatch => {

    var url = "/GetUser";
    axios.post(url).then((res) => {

        if (!!callback) {
            callback();
        }

        return dispatch({
            type: USER_DATA,
            payload: res.data
        });
    }).catch(err => {
        console.log(err);
        throw new Error('Error in FetchUserData funtion');

    });
        
};

export const loginAction = (email, password, callback) => dispatch => {
    var url = "/SignInData";

    axios.post(url, { email, password }).then((res) => {
        var data = res.data;
        if (!!callback) {
            callback();
        }
        if (data[0].auth === 'authentic') {
            localStorage.setItem('isUser', true)
            sessionStorage.setItem("uId", data[0].uId);
            sessionStorage.setItem("uRole", data[0].uRole);

            return dispatch({
                type: LOGIN_DATA,
                payload: res.data
            });
        } else {
            localStorage.setItem('isUser', false)
            return dispatch({
                type: LOGIN_STATUS,
                payload: res.data
            });
        }


    }).catch(err => {
        console.log(err);
        throw new Error('Error in Login funtion');

    });      
};
export const getblogdata = (id, role, callback) => dispatch => {

    var url = "/GetBlog";
    axios.post(url, { id, role }).then((res) => {
        //alert(JSON.stringify(res.data))
        if (!!callback) {
            callback();
        }

        return dispatch({
            type: BLOG_DATA,
            payload: res.data
        });
    }).catch(err => {
        console.log(err);
        throw new Error('Error in  FetchBlog  Function');

    });
        
};