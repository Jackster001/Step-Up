import axios from 'axios';
import {auth, firestore} from '../Firebase/firebase';
import { v4 as uuidv4 } from 'uuid';

export const setJobData = (id) => async(dispatch) => {
    let userInfo = await firestore.collection("Step-up-data").doc(id).get();
    userInfo = await userInfo.data();
    await dispatch({
        type:'SET_JOBDATA',
        payload: userInfo.jobData
    })
}

export const setCard = (Profile) => async (dispatch)=> {
    try{
        await firestore.collection("Step-up-data").doc(Profile.id).set(Profile);

        await dispatch({
            type:'SET_JOBDATA',
            payload: Profile.jobData
        })

    }catch(err){
        throw err
    }
}

export const finishSettingCard = () => {
    return {
        type: "BOARD_DATA_LOADED"
    };
}