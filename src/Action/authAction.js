import axios from 'axios';
import setAuthToken from '../Utils/setAuthToken';
import jwt_decode from 'jwt-decode';
const server = "https://step-up-careers-api.herokuapp.com";
const dev= "http://localhost:5000";
export const registerUser=  (userData)=> async dispatch=>{
    try{
        const User = await axios.post(`${server}/users/register`, userData)
        window.location.href = '/login';
    }catch(err){
        dispatch({
            type: "GET_ERRORS",
        })
    }
}

//login token
export const loginUser =(userData)=> async dispatch =>{
    try{
        
        let res = await axios.post(`${server}/users/login`, userData)
        //save to local storage
        const{token, userInfo}= res.data;
        //set token to ls
        await localStorage.setItem('jwtToken', token);
        //set token to auth header
        setAuthToken(token);
        //decode token to get user data
        await setUserProfileLoading();
        await dispatch({
            type:"SET_CURRENT_USER",
            payload: userInfo
        })
        const decoded =jwt_decode(token);
        await dispatch(setToken(decoded));
    }catch(err){
        dispatch({
            type: "GET_ERRORS",
        })
    }
}


// Profile loading
export const setUserProfileLoading = () => {
    return {
      type: "USER_PROFILE_LOADING"
    };
};

// turn off profile loading
export const disableUserProfileLoading = () => {
    return {
      type: "DISABLE_USER_PROFILE_LOADING"
    };
};

//set logged in user
export const setToken=(decoded)=>{
    return{
        type:"SET_TOKEN",
        payload: decoded
    }
}

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setToken({}));
    dispatch({
        type:"LOG_OUT",
        payload: {}
    })
    window.location.href = '/login';
};
  