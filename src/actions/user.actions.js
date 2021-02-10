import axios from 'axios';

export const GET_USER = "GET_USER";
export const UPDATE_PRESENTATION = "UPDATE_PRESENTATION";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER"

export const getUser = (uid) => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}api/user/${uid}`
        }).then((res)=>{ dispatch({type: GET_USER, payload: res.data })
        }).catch((err)=>{console.log(err);}) 
    }
}

export const updatePresentation = (userId, presentation) => {
    return (dispatch) => {
        return axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { presentation }
        }).then((res)=>{ dispatch({type: UPDATE_PRESENTATION, payload: presentation })
        }).catch((err) => console.log(err))
    }
}

export const followUser = (followerId, idToFollow) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/user/follow/` + followerId,
            data: {idToFollow}
        }).then((res) => {
            dispatch({type: FOLLOW_USER, payload: {idToFollow}})
        }).catch((err)=>{console.log(err)})
    }
}

export const unfollowUser = (followerId, idToUnfollow) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/user/unfollow/` + followerId,
            data: {idToUnfollow}
        }).then((res) => {
            dispatch({type: UNFOLLOW_USER, payload: {idToUnfollow}})
        }).catch((err)=>{console.log(err)})
    }
}
