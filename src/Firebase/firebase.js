import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDfzgPMCg_jNW7A8R331EeziBQNBSzSF-8",
    authDomain: "step-up-careers.firebaseapp.com",
    databaseURL: "https://step-up-careers.firebaseio.com",
    projectId: "step-up-careers",
    storageBucket: "step-up-careers.appspot.com",
    messagingSenderId: "1042562980725",
    appId: "1:1042562980725:web:1837809bb9b23ce2b1113c",
    measurementId: "G-W5RX62Z6MQ"
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();