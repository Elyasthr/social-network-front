import { DELETE_MESSAGE, DELETE_POST, EDIT_MESSAGE, GET_POSTS, LIKE_POST, UNLIKE_POST, UPDATE_POST } from "../actions/post.action";

const initialState = {};

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return action.payload;

        case LIKE_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        likers: [action.payload.userId, ...post.likers]
                    }
                }
                return post;
            });

        case UNLIKE_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        likers: post.likers.filter((id) => id !== action.payload.userId)
                    }
                }
                return post;
            });

        case UPDATE_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        message: action.payload.message
                    }
                } else return post;
            })

        case DELETE_POST:
            return state.filter((post) => post._id !== action.payload.postId)

        case EDIT_MESSAGE:
            //on chercher dabord le bon post pui le commentaire en question
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        comments: post.comments.map((comment) => {
                            if (comment._id === action.payload.commentId) {
                                return {
                                    ...comment,
                                    message: action.payload.message
                                }
                            } else return comment
                        })
                    }
                } else return post
            })

        case DELETE_MESSAGE:
            return state.map((post) => {
                if (post._id === action.payload.postId){
                    return {
                        ...post,
                        //on reprend tout sauf ce qui ne correspond pas a la condition
                        comments: post.comments.filter((comment)=> comment._id !== action.payload.commentId)
                    }
                }
                else return post
            })

        default:
            return state;
    }
}