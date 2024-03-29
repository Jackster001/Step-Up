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

export const registerUser = (userData)=> async dispatch=>{
    try{
        let newUser = await auth.createUserWithEmailAndPassword(userData.email, userData.password);
        await firestore.collection("Step-up-data").doc(`${newUser.user.uid}`).set({
            id: newUser.user.uid,
            firstName : userData.firstName,
            lastName : userData.lastName,
            email : userData.email,
            jobsApplied : [],
            jobData : {
                jobStatuses: ["Applied", "Interview", "Offer", "Rejected"],
                Applied: [],
                Interview: [],
                Offer: [],
                Rejected: []
            },
            date : new Date(),
            tutorialCompletion : false
        })

        let user = await auth.signInWithEmailAndPassword(userData.email, userData.password);   
        
        let userInfo = await firestore.collection("Step-up-data").doc(user.user.uid).get();

        userInfo = userInfo.data();
        await firestore.collection("tutorial-data").doc(user.user.uid).set({
            tutorialLink: false,
            addCardDuration: false
        })
        
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

        let userInfo = await firestore.collection("Step-up-data").doc(user.user.uid).get();

        userInfo = await userInfo.data();

        if(!userInfo.hasOwnProperty("tutorialCompletion")){
            userInfo.tutorialCompletion = false;
            await firestore.collection("tutorial-data").doc(user.user.uid).set({
                tutorialLink: false,
                addCardDuration: false
            })
            await firestore.collection("Step-up-data").doc(user.user.uid).set(userInfo)
        }
        var jobData = {
            jobStatuses: ["Applied", "Interview", "Offer", "Rejected"],
            Applied: [],
            Interview: [],
            Offer: [],
            Rejected: []
        };

        if(!!userInfo.jobsApplied && !userInfo.jobData){
            for(let i = 0; i < userInfo.jobsApplied.length; i++){
                jobData[userInfo.jobsApplied[i].JobStatus].push(userInfo.jobsApplied[i]);
            }
            userInfo.jobData = jobData;
        }
        await firestore.collection("Step-up-data").doc(userInfo.id).set(userInfo)

        await dispatch({
            type:"SET_CURRENT_USER",
            payload: userInfo
        }) 
        await dispatch({
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