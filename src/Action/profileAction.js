import axios from 'axios';
import {auth, firestore} from '../Firebase/firebase'
const server = "https://step-up-careers-api.herokuapp.com";
const dev= "http://localhost:5000";


export const getProfile = (id) => async (dispatch)=> {
    try{

        // const profile= await axios.get(`${server}/users/${id}`, 
        // {headers:{'Authorization':localStorage.jwtToken}});
        let id = auth.currentUser().user.uid
        let userInfo = firestore.collection("Step-up-data").get(id)
        await dispatch({
            type:'GET_PROFILE',
            payload: userInfo
        })
    }catch(err){
        throw err
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

// add job to jobs applied in the user data
export const addJob = (id , jobData) => async (dispatch)=> {
    try{
        // const profile= await axios.post(`${server}/users/apply-job`,{id, jobData});
        // let id = auth.currentUser().user.uid
        let userInfo = await firestore.collection("Step-up-data").doc(id).get()
        userInfo = userInfo.data();
        for(let i=0; i< 200; i++){
            userInfo.jobsApplied.unshift(jobData)
        }
        await firestore.collection("Step-up-data").doc(id).set(userInfo)
        
        await dispatch({
            type:'APPLY_JOB',
            payload: userInfo
        })
    }catch(err){
        throw err
    }
}

// remove job from jobs applied in the user data
export const removeJob = (id , i) => async (dispatch)=> {
    try{
        // const profile= await axios.post(`${server}/users/delete-job`,{id,i});
        let userInfo = await firestore.collection("Step-up-data").doc(id).get()
        userInfo = userInfo.data()
        userInfo.jobsApplied.splice(i,1)
        await firestore.collection("Step-up-data").doc(id).set(userInfo)
        await dispatch({
            type:'REMOVE_JOB',
            payload: userInfo
        })
    }catch(err){
        throw err
    }
}

// update job from jobs applied in the user data
export const updateJob = (id, jobData, i) => async (dispatch)=> {
    try{
        let userInfo = await firestore.collection("Step-up-data").doc(id).get()
        userInfo = userInfo.data()
        userInfo.jobsApplied[i] = jobData
        await firestore.collection("Step-up-data").doc(id).set(userInfo)
        await dispatch({
            type:'UPDATE_JOB',
            payload: userInfo
        })
    }catch(err){
        throw err
    }
}

export const setEditModalData =(data) => async (dispatch)=> {
    try{
        await dispatch({
            type:"SET_EDIT_DATA",
            payload: data
        })
    }catch(err){
        throw err
    }
}

export const openingEditModalFunction =() => async (dispatch)=> {
    try{
        await dispatch({
            type:"OPEN_EDIT_MODAL",
            payload: false
        })
    }catch(err){
        throw err
    }
}

// get all jobs applied in the user data
export const getAllJobs = (id) => async (dispatch)=> {
    try{
        const profile= await axios.post(`${dev}/users/apply-job/${id}`, 
        {headers:{'Authorization':localStorage.jwtToken}});
        console.log(profile)
        // await dispatch({
        //     type:'GET_PROFILE',
        //     payload: profile.data
        // })
    }catch(err){
        throw err
    }
}
