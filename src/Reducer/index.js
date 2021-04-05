import {combineReducers} from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import tutorialReducer from './tutorialReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    authState: authReducer,
    userState: userReducer,
    tutorialState: tutorialReducer,
    errorState: errorReducer
});