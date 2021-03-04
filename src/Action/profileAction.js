import axios from 'axios';
import {auth, firestore} from '../Firebase/firebase';
import { v4 as uuidv4 } from 'uuid';

export const getProfile = (id) => async (dispatch)=> {
    try{

        // const profile= await axios.get(`${server}/users/${id}`, 
        // {headers:{'Authorization':localStorage.jwtToken}});
        // let id = auth.currentUser();
        let userInfo = await firestore.collection("Step-up-data").doc(id).get();
        userInfo = await userInfo.data();
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
        jobData.job_id= uuidv4();
        userInfo.jobsApplied.unshift(jobData)
        setUserProfileLoading()
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
        console.log(userInfo)
        await firestore.collection("Step-up-data").doc(id).set(userInfo)
        await dispatch({
            type:'UPDATE_JOB',
            payload: userInfo
        })
    }catch(err){
        console.log(err)
    }
}

export const setEditModalData =(id, data) => async (dispatch)=> {
    try{
        let contactList = await firestore.collection("Contact-Data").doc(id).get();
        contactList = contactList.data()
        let result = []
        if(!!contactList){
            result = contactList[data.job_id]
        }
        await dispatch({
            type:"SET_EDIT_DATA",
            payload: {data, result},
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
        // const profile= await axios.post(`${dev}/users/apply-job/${id}`, 
        // {headers:{'Authorization':localStorage.jwtToken}});
        // console.log(profile)
        // await dispatch({
        //     type:'GET_PROFILE',
        //     payload: profile.data
        // })
    }catch(err){
        throw err
    }
}

// add contact
export const getAllContactInfo = (id) => async (dispatch)=> {
    try{
        let contactList = await firestore.collection("Contact-Data").doc(id).get();
        contactList = contactList.data();
        await dispatch({
            type:'GET_CONTACT',
            payload: contactList
        })
    }catch(err){
        throw err
    }
}

// add contact
export const addContactInfo = (id, job_id, contactData) => async (dispatch)=> {
    try{
        console.log("hello")
        let contactList = await firestore.collection("Contact-Data").doc(id).get();
        contactList = contactList.data();
        let result = [];
        if(!!contactList && contactList[job_id] !== undefined){
            contactList[job_id].push(contactData);
            result = contactList[job_id];
            await firestore.collection("Contact-Data").doc(id).set(contactList);
        }else{
            contactList[job_id] = [contactData];
            await firestore.collection("Contact-Data").doc(id).set(contactList)
            result = contactList[job_id];
        }
        await dispatch({
            type:'ADD_CONTACT',
            // payload: contactList
            payload: contactList
        })
    }catch(err){
        throw err
    }
}

// edit contact
export const editContactInfo = (id, job_id, contactData) => async (dispatch)=> {
    try{
        let contactList = await firestore.collection("Contact-Data").doc(id).get();
        contactList = contactList.data();
        contactList[job_id] = contactData;
        await firestore.collection("Contact-Data").doc(id).set(contactList)

        await dispatch({
            type:'GET_CONTACT',
            payload: contactList
        })
    }catch(err){
        throw err
    }
}

        
// delete contact
export const deleteContactInfo = (id, job_id, i) => async (dispatch)=> {
    try{
        let contactList = await firestore.collection("Contact-Data").doc(id).get();
        contactList = contactList.data()
        contactList[job_id].splice(i,1)
        await firestore.collection("Contact-Data").doc(id).set(contactList)
        
        await dispatch({
            type:'GET_CONTACT',
            payload: contactList
        })
    }catch(err){
        throw err
    }
}

export const disableContactLoading = () =>{
    return{
        type: "DISABLE_CONTACT_LOADING"
    }
}

