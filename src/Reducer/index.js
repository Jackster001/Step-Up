import {combineReducers} from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import jobDataReducer from './jobDataReducer';
import localNavigationReducer from './localNavigationReducer';
import tutorialReducer from './tutorialReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    authState: authReducer,
    userState: userReducer,
    jobDataState: jobDataReducer,
    localNavigationState: localNavigationReducer,
    tutorialState: tutorialReducer,
    errorState: errorReducer
});