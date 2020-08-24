import axios from 'axios';
const server = "https://pacific-waters-24064.herokuapp.com/";
const dev= "http://localhost:5000";


export const getProfile = (id) => async (dispatch)=> {
    try{
        const profile= await axios.get(`${server}/users/${id}`, 
        {headers:{'Authorization':localStorage.jwtToken}});
        await dispatch({
            type:'GET_PROFILE',
            payload: profile.data
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
        const profile= await axios.post(`${server}/users/apply-job`,{id, jobData});
        await dispatch({
            type:'APPLY_JOB',
            payload: profile.data
        })
    }catch(err){
        throw err
    }
}

// remove job from jobs applied in the user data
export const removeJob = (id , job_id) => async (dispatch)=> {
    try{
        const profile= await axios.post(`${server}/users/apply-job/${id}`, 
        {headers:{'Authorization':localStorage.jwtToken}},job_id);
        console.log(profile)
        // await dispatch({
        //     type:'GET_PROFILE',
        //     payload: profile.data
        // })
    }catch(err){
        throw err
    }
}

// update job from jobs applied in the user data
export const updateJob = (id, jobData, i) => async (dispatch)=> {
    try{
        const profile= await axios.post(`${server}/users/update-job/`, {id, jobData, i});
        await dispatch({
            type:'UPDATE_JOB',
            payload: profile.data
        })
    }catch(err){
        throw err
    }
}

// get all jobs applied in the user data
export const getAllJobs = (id) => async (dispatch)=> {
    try{
        const profile= await axios.post(`${server}/users/apply-job/${id}`, 
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
