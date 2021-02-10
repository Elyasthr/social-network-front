import axios from 'axios';

export const GET_FRIEND_USER = "GET_FRIEND_USER";

export const getFriendUser = (posterId) => {
    return (dispatch) => {
        return axios.get(`${process.env.REACT_APP_API_URL}api/user/${posterId}`).then((res) =>{
            dispatch({ type: GET_FRIEND_USER, payload: res.data })
        }).catch((err)=>console.log(err));
    };
};