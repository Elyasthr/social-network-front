import axios from "axios";

//posts
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const EDIT_MESSAGE = "EDIT_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";

export const getPosts = () => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}api/post/`
        }).then((res) => {
            dispatch({ type: GET_POSTS, payload: res.data })
        }).catch((err) => console.log(err))
    }
}

export const addPost = (posterId, message) => {
    return () => {
        return axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}api/post/`,
            data: {posterId: posterId, message: message}
        })
    }
}

export const likePost = (postId, userId) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/like/` + postId,
            data: { id: userId }
        }).then((res) => {
            dispatch({ type: LIKE_POST, payload: { postId, userId } })
        }).catch((err) => console.log(err))
    }
}

export const unlikePost = (postId, userId) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/unlike/` + postId,
            data: { id: userId }
        }).then((res) => {
            dispatch({ type: UNLIKE_POST, payload: { postId, userId } })
        }).catch((err) => console.log(err))
    }
}

export const updatePost = (postId, message) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/post/` + postId,
            data: { message }
        }).then((res) => {
            dispatch({ type: UPDATE_POST, payload: { message, postId } })
        }).catch((err) => console.log(err))
    }
}

export const deletePost = (postId)=>{
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}api/post/` + postId
        }).then((res) => {
            dispatch({ type: DELETE_POST, payload: { postId } })
        }).catch((err) => console.log(err))
    }
}

export const addMessage = (postId, commenterId, message, commenterPseudo) => {
    
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/comment/` + postId,
            data: {commenterId, commenterPseudo, message},
        }).then((res)=>{dispatch({ type: ADD_MESSAGE, payload: { postId } })
        }).catch((err) => console.log(err))

    }

}

export const editMessage = (postId, commentId, message) => {
    
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/edit-comment/` + postId,
            data: {commentId, message},
        }).then((res)=>{dispatch({ type: EDIT_MESSAGE, payload: { postId, commentId, message } })
        }).catch((err) => console.log(err))

    }

}

export const deleteMessage = (postId, commentId) => {
    
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/delete-comment/` + postId,
            data: {commentId},
        }).then((res)=>{dispatch({ type: DELETE_MESSAGE, payload: { postId, commentId} })
        }).catch((err) => console.log(err))

    }

}