import { GET_FRIEND_USER } from "../actions/friendUser.actions";

const initialState = {};

export default function frienUsersReducer(state = initialState, action){
    switch(action.type){

        case GET_FRIEND_USER:
            return action.payload;

        default:
            return state;
    }
}