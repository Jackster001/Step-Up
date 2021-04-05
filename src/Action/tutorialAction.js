import axios from 'axios';
import {firestore} from '../Firebase/firebase';

export const getTutorialSet = (id) => async (dispatch) =>{
    try{
        let tutorialInfo = await firestore.collection("tutorial-data").doc(id).get();
        tutorialInfo = tutorialInfo.data();
        if(tutorialInfo != null){
            await dispatch({
                type:'TUTORIAL_UPDATE',
                payload: tutorialInfo
            })
        }
    }catch(err){
        throw err
    }
}

export const setTutorialTrue = (id) => async (dispatch) => {
    try{
        let tutorialInfo = await firestore.collection("tutorial-data").doc(id).get();
        tutorialInfo = tutorialInfo.data();
        tutorialInfo.tutorialLink = true;
        let userInfo = await firestore.collection("Step-up-data").doc(id).get();
        if(tutorialInfo.addCardDuration === true){
            firestore.collection("tutorial-data").doc(id).delete();
            userInfo = userInfo.data();
            userInfo.tutorialCompletion = true;
            await firestore.collection("Step-up-data").doc(id).set(userInfo)
            await dispatch({
                type: "USER_PROFILE_LOADING"
            })
            return await dispatch({
                type:'GET_PROFILE',
                payload: userInfo
            })
        }else{
            await firestore.collection("tutorial-data").doc(id).set(tutorialInfo);
        }
        
        await dispatch({
            type:'TUTORIAL_UPDATE',
            payload: tutorialInfo
        })
    }catch(err){
        throw err
    }
}

export const setCardDurationTrue = (id) => async (dispatch)=> {
    try{
        let tutorialInfo = await firestore.collection("tutorial-data").doc(id).get();
        tutorialInfo = tutorialInfo.data();
        tutorialInfo.addCardDuration = true;
        let userInfo = await firestore.collection("Step-up-data").doc(id).get();
        if(tutorialInfo.tutorialLink === true){
            firestore.collection("tutorial-data").doc(id).delete();
            userInfo = userInfo.data();
            userInfo.tutorialCompletion = true;
            await firestore.collection("Step-up-data").doc(id).set(userInfo);
            await dispatch({
                type: "USER_PROFILE_LOADING"
            })
            return await dispatch({
                type:'GET_PROFILE',
                payload: userInfo
            })
        }else{
            await firestore.collection("tutorial-data").doc(id).set(tutorialInfo);
        }
        
        await dispatch({
            type:'TUTORIAL_UPDATE',
            payload: tutorialInfo
        })
    }catch(err){
        throw err
    }
}

// turn off profile loading
export const disableTutorialLoading = () => {
    return {
      type: "DISABLE_TUTORIAL_LOADING"
    };
};

