import {combineReducers} from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer'

export default combineReducers({
    authState: authReducer,
    userState: userReducer
});