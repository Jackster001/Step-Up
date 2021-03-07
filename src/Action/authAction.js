import axios from 'axios';
import setAuthToken from '../Utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {auth, firestore} from '../Firebase/firebase'
import firebase from "firebase/app";
import { persistor } from '../store';
import {CheckError} from './errorAction'

export const setAuth = (auth) => dispatch =>{
    dispatch({
        type:"SET_AUTH",
        payload: auth
    })
}

export const disableAuthLoading = () => dispatch =>{
    dispatch({
        type:"AUTH_DONE"
    })
}

export const registerUser=  (userData)=> async dispatch=>{
    try{
        let newUser = await auth.createUserWithEmailAndPassword(userData.email, userData.password);
        await firestore.collection("Step-up-data").doc(`${newUser.user.uid}`).set({
            id: newUser.user.uid,
            firstName : userData.firstName,
            lastName : userData.lastName,
            email : userData.email,
            jobsApplied : [],
            date : new Date()
        })

        let user = await auth.signInWithEmailAndPassword(userData.email, userData.password);

        // console.log(user);

        // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        // .then(function() {  
        //     return firebase.auth().signInWithEmailAndPassword(userData.email, userData.password);
        // })
        // .catch(function(error) {
        //   var errorCode = error.code;
        //   var errorMessage = error.message;
        // });     
        
        let userInfo = await firestore.collection("Step-up-data").doc(user.user.uid).get();

        userInfo = userInfo.data();
        await setUserProfileLoading();
        await dispatch({
            type:"SET_CURRENT_USER",
            payload: userInfo
        }) 
        dispatch({
            type:"SET_AUTH",
            payload: true
        });

    }catch(err){
        dispatch({
            type: "SET_ERROR",
            payload: CheckError(err.code)
        })
    }
}

//login token
export const loginUser =(userData)=> async dispatch =>{
    try{
        let user = await auth.signInWithEmailAndPassword(userData.email, userData.password)

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function() {
          return firebase.auth().signInWithEmailAndPassword(userData.email, userData.password);
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage)
        });     
        
        let userInfo = await firestore.collection("Step-up-data").doc(user.user.uid).get();

        userInfo = await userInfo.data();
        await dispatch({
            type:"SET_CURRENT_USER",
            payload: userInfo
        }) 
        dispatch({
            type:"SET_AUTH",
            payload: true
        })
    }catch(err){
        dispatch({
            type: "SET_ERROR",
            payload: CheckError(err.code)
        })
    }
}

// Reset Password
export const resetPassword = (emailAddress) => async dispatch => {
    try{
        let reset = await auth.sendPasswordResetEmail(emailAddress)
        console.log(reset)
        await dispatch ({
            type: "PASSWORD_RESET"
        });
    }catch(err){
        console.log(err)
        dispatch({
            type: "SET_ERROR",
            payload: CheckError(err.code)
        })
    }
}

export const resetOff = () =>{
    return{
        type: "PASSWORD_RESET_OFF"
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
    // localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    // setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    // dispatch(setToken({}));
    persistor.purge();
    firebase.auth().signOut()
    dispatch({
        type:"PROFILE_LOGOUT"
    })
    dispatch({
        type:"LOG_OUT",
        payload: {}
    })
    window.location.href = '/login';
};

export const setSignUpEmail = (email) => async (dispatch) => {
    await dispatch({
        type:'SET_SIGNUP_EMAIL',
        payload: email
    })
    window.location.href = '/signup';
}
export const disableSignUpEmail = () => {
    return{
        type: "DISABLE_SET_SIGNUP_EMAIL"
    }
}
export const clearSignUpEmail = () =>{
    return{
        type: "CLEAR_SIGNUP_EMAIL"
    }
}

// const CheckError=(err)=>{
//     console.log(err);
//     console.log("helloooo")

// }
// export const ClearErrors = dispatch =>{
//     dispatch({
//         type: "CLEAR_ERROR"
//     })
// }


  