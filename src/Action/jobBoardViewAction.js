import axios from 'axios';
import {auth, firestore} from '../Firebase/firebase';
import { v4 as uuidv4 } from 'uuid';

export const setCard = (Profile) => async (dispatch)=> {
    try{

        await firestore.collection("Step-up-data").doc(Profile.id).set(Profile);

        await dispatch({
            type:'SET_CARD',
            payload: Profile
        })

    }catch(err){
        throw err
    }
}

export const finishSettingCard = () => {
    return {
        type: "FINISH_CARD"
    };
}