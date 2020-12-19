import {combineReducers} from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    authState: authReducer,
    userState: userReducer,
    errorState: errorReducer
});