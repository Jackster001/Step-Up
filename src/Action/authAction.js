import axios from 'axios';
import setAuthToken from '../Utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {auth, firestore} from '../Firebase/firebase'
import firebase from "firebase/app";
const server = "https://step-up-careers-api.herokuapp.com";
const dev= "http://localhost:5000";



export const setTrue = () => dispatch =>{
    dispatch({
        type:"AUTHENTICATE_USER",
    })

}
// auth.onAuthStateChanged(function (user){
//     if(user){
//         console.log(user)
//         // setTrue()
//         // firebase.auth().signOut()
//         logoutUser()
//         // auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
//         console.log(auth.currentUser)
//         // firebase.auth().signOut()
//     }else{
//         logoutUser()
//         firebase.auth().signOut()
//     }
// })

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
        let user = await auth.signInWithEmailAndPassword(userData.email, userData.password)

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function() {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.
          return firebase.auth().signInWithEmailAndPassword(userData.email, userData.password);
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
        });     

        await dispatch({
            type:"AUTHENTICATE_USER",
        })
        
        firestore.collection("Step-up-data").doc(user.user.uid).get().then(doc=>{
            if(doc){
                setUserProfileLoading();
                dispatch({
                    type:"SET_CURRENT_USER",
                    payload: doc.data()
                }) 
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        // let res = await axios.post(`${server}/users/login`, userData)
        //save to local storage
        // const{token, userInfo}= res.data;
        //set token to ls
        // await localStorage.setItem('jwtToken', token);
        //set token to auth header
        // setAuthToken(token);
        //decode token to get user data
        // const decoded =jwt_decode(token);
        // await dispatch(setToken(decoded));
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
    // localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    // setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    // dispatch(setToken({}));
    firebase.auth().signOut()
    dispatch({
        type:"LOG_OUT",
        payload: {}
    })
    window.location.href = '/login';
};

  