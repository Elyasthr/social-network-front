import { combineReducers } from 'redux';
import postReducer from './post.reducer'
import userReducer from './user.reducer';
import usersReducer from './users.reducers';
import friendUserReducer from './friendUser.reducer';

export default combineReducers({
    postReducer,
    userReducer,
    usersReducer,
    friendUserReducer,
})