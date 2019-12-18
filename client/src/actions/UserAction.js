import { USER_DATA,SEARCH_DATA } from './types';
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
    })
        .catch(err => {
            console.log(err);
            throw new Error('Error in FetchData funtion');

        });

};
export const searchuser = (searchname,callback) => dispatch => {

    var url = "/SearchUser";
    axios.post(url,{searchname}).then((res) => {

        if (!!callback) {
            callback();
        }

        return dispatch({
            type: SEARCH_DATA,
            payload: res.data
        });
    })
        .catch(err => {
            console.log(err);
            throw new Error('Error in FetchData funtion');

        });

}